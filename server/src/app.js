const bcrypt = require("bcryptjs");
const path = require("node:path");
const express = require("express");
const expressSession = require("express-session");
require("dotenv/config");

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma/client");

const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oidc");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

// SESSION SETUP

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  })
);

// PASSPORT

app.use(passport.initialize());

app.use(passport.session());

// GLOBAL USER

app.use((req, res, next) => {
  res.locals.currentUser = req.user;

  res.locals.error = req.session.messages
    ? req.session.messages[0]
    : null;

  delete req.session.messages;

  next();
});

// ROUTES

app.get("/", (req, res) => {
  res.render("index");
});

// SIGN UP

app.get("/sign-up", (req, res) => {
  res.render("sign-up-form");
});

app.post("/sign-up", async (req, res, next) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (existingUser) {
      return res.render("sign-up-form", { error: "Username is already taken" });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingEmail) {
      return res.render("sign-up-form", { error: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.redirect("/log-in");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// LOGIN

app.get("/log-in", (req, res) => {
  res.render("log-in-form");
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  })
);

// LOGOUT

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      res.clearCookie("connect.sid");

      res.redirect("/");
    });
  });
});


// GOOGLE STRATEGY

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/oauth2/redirect/google",
      scope: ["profile", "email"],
    },
    async (issuer, profile, done) => {
      try {
        const cred = await prisma.federatedCredential.findUnique({
          where: {
            provider_subject: {
              provider: issuer,
              subject: String(profile.id),
            },
          },
          include: { user: true },
        });

        if (cred) {
          return done(null, cred.user);
        }

        // Handle duplicate username from Google
        const displayName = profile.displayName
          ? profile.displayName.replace(/\s+/g, "_").toLowerCase()
          : `user_${Date.now()}`;

        const user = await prisma.user.create({
          data: {
            username: displayName,
            email: profile.emails?.[0]?.value ?? null, // save email
            federatedCredentials: {
              create: {
                provider: issuer,
                subject: String(profile.id),
              },
            },
          },
        });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Redirect to Google
app.get("/login/google", passport.authenticate("google"));

// Google redirects back here
app.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

// PASSPORT STRATEGY

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },

    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return done(null, false, {
            message: "No account found with that email",
          });
        }

        const match = await bcrypt.compare(
          password,
          user.password
        );

        if (!match) {
          return done(null, false, {
            message: "Incorrect email or password",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// STORE USER ID IN SESSION

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// GET USER FROM SESSION

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

// START SERVER

app.listen(3000, () => {
  console.log("Server running on port 3000");
});