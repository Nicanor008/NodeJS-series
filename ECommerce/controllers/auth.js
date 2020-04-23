const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const keys = require("../utils/keys");


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
        .json({
          message:
            "Account created. Activation link has been sent to your email.",
          data: result,
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.postSignIn = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  // find user
  User.findOne({ email }).then((response) => {
    if (!response) {
      return res.status(404).json({ message: "Email does not exist" });
    }
    if(!response.active) {
      return res.status(400).json({ message: "Account is not activated" })
    }
    bcrypt.compare(password, response.password).then((pass) => {
      if (!pass) {
        return res.status(400).json({ message: "Wrong Password" });
      }
      const payload = {
        id: response.id,
        email: response.email,
      };
      jwt.sign(
        payload,
        keys.Secret_Key,
        {
          expiresIn: 31556926,
        },
        (err, token) => {
          return res.status(200).json({
            message: "Login Successful",
            token: "Bearer " + token,
            data: response,
          });
        }
      );
    });
  });
};

exports.activateAccount = (req, res) => {
  const { id } = req.params;

  // Find the user and update
  User.findByIdAndUpdate({ _id:id }, { active: true }).then(response => {
    if (!response) {
      return res.status(404).json({ message: "User Does not Exist" });
    }
    return res.status(200).json({ message: "Account has been activated"})
  }).catch(error => {
    res.status(500).json({ error })
  })
}
