const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const sendMail = require("../utils/sendMail");

exports.postLogin = (req, res, next) => {
  console.log("Got here");
};

exports.postSignUp = (req, res, next) => {
  const { email, password, username, role } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  return bcrypt
    .hash(password, 12)
    .then((crpytedPassword) => {
      const user = new User({
        email,
        password: crpytedPassword,
        username,
        role,
      });
      return user.save();
    })
    .then((result) => {
      sendMail.sendConfirmEmail(result);
        return res
        .status(200)
        .json({ message: "Account created. Activation link has been sent to your email.", data: result });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
