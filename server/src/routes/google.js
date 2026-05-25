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
  (req, res, next) => {
    passport.authenticate("google", {
    }, (err, user, info) => {
      if (err) console.error("Google auth error:", err);
      if (!user) console.error("Google auth failed:", info);
      if (err || !user) return res.redirect(`${CLIENT_URL}/log-in?error=google_auth_failed`);
      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    const { id, username, email } = req.user;

    const token = jwt.sign(
      { id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

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