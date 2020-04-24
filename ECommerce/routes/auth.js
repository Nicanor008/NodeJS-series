const express = require("express");
const { check } = require("express-validator");

const authControllers = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

// create new account
router.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("Enter a valid email")
      .custom((value, { req, res }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail already exists");
          }
        });
      })
      .normalizeEmail(),
  ],
  authControllers.postSignUp
);

// Login
router.post("/login", authControllers.postSignIn);

// Activate account
router.patch("/activate/:email", authControllers.activateUserAccount);

module.exports = router;
