const bcrypt = require("bcryptjs");
const { Router } = require("express");
const passport = require("passport");

const jwt = require("jsonwebtoken");

const prisma = require("../lib/prisma");
 
const router = Router();

// SIGN UP

router.post("/sign-up", async (req, res, next) => {
  const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
  try {
    if (!req.body.email && !req.body.password && !req.body.username) {
      return res.json({ error: "Please fill in all fields", email: "", username: "" });
    }

    if (!req.body.username) {
      return res.json({ error: "Username is required", email: req.body.email, username: "" });
    }

    if (!req.body.email) {
      return res.json({ error: "Email is required", email: "", username: req.body.username });
    }

    if (!req.body.password) {
      return res.json({ error: "Password is required", email: req.body.email, username: req.body.username });
    }

    if(!pattern.test(req.body.password)){
      return res.json({ error: "Invalid password format", email: req.body.email, username: req.body.username });
    }

    if (!req.body.confirmPassword) {
      return res.json({ error: "Please confirm your password", email: req.body.email, username: req.body.username });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.json({ error: "Passwords do not match", email: req.body.email, username: req.body.username });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (existingUser) {
      return res.json({ error: "Username is already taken", email: req.body.email, username: req.body.username });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingEmail) {
      return res.json({ error: "This email is already registered", email: req.body.email, username: req.body.username });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

    res.status(201).json({
            message:
                "Account created successfully",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
  } catch (error) {

    console.error(error);
    next(error);
  
  }
});

// LOGIN

router.post("/log-in", async (req, res, next) => {
  try {
    if (!req.body.email && !req.body.password) {
      return res.json({ error: "Please fill in all fields", email: "" });
    }

    if (!req.body.email) {
      return res.json({ error: "Email is required", email: "" });
    }

    if (!req.body.password) {
      return res.json({ error: "Password is required", email: req.body.email });
    }

    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.status(401).json({ error: info.message });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login successful",
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    })(req, res, next);

  } catch (error) {
    console.error(error);
    next(error);
  }
});

// LOGOUT

router.post("/log-out", (req, res) => {

    res.json({
        message:
            "Logout successful",
    });
});


module.exports = router;