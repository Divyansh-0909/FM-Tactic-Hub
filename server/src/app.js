const path = require("node:path");
const express = require("express");
require("dotenv/config");

const prisma = require("./lib/prisma");
const passport = require("./config/passport");
 
const authRouter = require("./routes/auth");
const googleRouter = require("./routes/google");

const session = require("express-session");

const cors = require("cors");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

// SESSION SETUP
// For google strategy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set to true in production (HTTPS only)
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

// PASSPORT

app.use(passport.initialize());
// ROUTES

app.use("/", authRouter);
app.use("/", googleRouter);


// ERROR HANDLER

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        error: "Server error",
    });
});

// START SERVER

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});