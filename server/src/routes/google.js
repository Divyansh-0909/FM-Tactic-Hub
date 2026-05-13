const { Router } = require("express");
const passport = require("passport");

const router = Router();

// Redirect to Google
router.get("/login/google", passport.authenticate("google"));

// Google redirects back here
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

module.exports = router;