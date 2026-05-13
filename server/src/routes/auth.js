const bcrypt = require("bcryptjs");
const { Router } = require("express");
const passport = require("passport");
 
const prisma = require("../lib/prisma");
 
const router = Router();

// SIGN UP

router.get("/sign-up", (req, res) => {
  res.render("sign-up-form", { error: null, email: "", username: "" });;
});

router.post("/sign-up", async (req, res, next) => {
  try {
    if (!req.body.email && !req.body.password && !req.body.username) {
      return res.render("sign-up-form", { error: "Please fill in all fields", email: "", username: "" });
    }

    if (!req.body.username) {
      return res.render("sign-up-form", { error: "Username is required", email: req.body.email, username: "" });
    }

    if (!req.body.email) {
      return res.render("sign-up-form", { error: "Email is required", email: "", username: req.body.username });
    }

    if (!req.body.password) {
      return res.render("sign-up-form", { error: "Password is required", email: req.body.email, username: req.body.username });
    }

    if (!req.body.confirmPassword) {
      return res.render("sign-up-form", { error: "Please confirm your password", email: req.body.email, username: req.body.username });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.render("sign-up-form", { error: "Passwords do not match", email: req.body.email, username: req.body.username });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (existingUser) {
      return res.render("sign-up-form", { error: "Username is already taken", email: req.body.email, username: req.body.username });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingEmail) {
      return res.render("sign-up-form", { error: "This email is already registered", email: req.body.email, username: req.body.username });
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

router.get("/log-in", (req, res) => {
  res.render("log-in-form", { error: null, email: ""});;
});

router.post("/log-in", (req, res, next) => {
  if (!req.body.email && !req.body.password) {
    return res.render("log-in-form", { error: "Please fill in all fields", email: "" });
  }

  if (!req.body.email) {
    return res.render("log-in-form", { error: "Email is required", email: "" });
  }

  if (!req.body.password) {
    return res.render("log-in-form", { error: "Password is required", email: req.body.email });
  }

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  })(req, res, next);
});

// LOGOUT

router.get("/log-out", (req, res, next) => {
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

module.exports = router;