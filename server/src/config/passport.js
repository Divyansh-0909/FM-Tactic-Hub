const bcrypt = require("bcryptjs");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oidc");

const prisma = require("../lib/prisma");

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

        // ✅ Handle Google users who have no password
        if (!user.password) {
          return done(null, false, {
            message: "This account uses Google to sign in",
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

module.exports = passport;