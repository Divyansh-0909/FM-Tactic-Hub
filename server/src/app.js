const path = require("node:path");
const express = require("express");
const expressSession = require("express-session");

require("dotenv/config");

const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const prisma = require("./lib/prisma");
const passport = require("./config/passport");
const locals = require("./middleware/locals");
 
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const googleRouter = require("./routes/google");

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

// GLOBAL USERS

app.use(locals);

// ROUTES

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", googleRouter);

// START SERVER

app.listen(3000, () => {
  console.log("Server running on port 3000");
});