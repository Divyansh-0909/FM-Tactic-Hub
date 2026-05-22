const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = Router();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Redirect to Google
router.get(
  "/login/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

// Google redirects back here
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${CLIENT_URL}/log-in?error=google_auth_failed`,
  }),
  (req, res) => {
    const { id, username, email } = req.user;

    const token = jwt.sign(
      { id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Can't send JSON in a redirect flow — pass token + user via query params
    // so the frontend /oauth/callback route can call saveAuth() and redirect home
    const params = new URLSearchParams({
      token,
      id,
      username,
      email,
    });

    res.redirect(`${CLIENT_URL}/oauth/callback?${params}`);
  }
);

module.exports = router;