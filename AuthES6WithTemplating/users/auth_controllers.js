import User from "./users_models";
import { hash, compare } from "bcryptjs";
import { sendConfirmEmail } from "../utils/sendMail";
import { SERVICE_UNAVAILABLE, OK, NOT_FOUND } from "http-status";
import { sign } from "jsonwebtoken";

export function getAddNewUser(req, res, next) {
  res.render("auth/signup", {
    pageTitle: "Create Account",
    path: "/auth/register",
    title: "Create Account",
  });
}

// register new user
export function registerUser(req, res) {
  const { password, email, name, role } = req.body;
  // const image = req.file;
  // const pictureUrl = image.path;
  User.findOne({ email }).then((userExists) => {
    if (userExists) {
      return res.render("auth/verifyAccount", {
        title: "Error",
        message: "Email already exist",
        errorIsPresent: true,
      });
    }
    return hash(password, 12)
      .then((encryptedPassword) => {
        const user = new User({
          password: encryptedPassword,
          email,
          name,
          role,
        });
        return user.save();
      })
      .then((response) => {
        sendConfirmEmail(response);
        return res.render("auth/verifyAccount", {
          message: "Account created. Check your email to activate account",
          title: "Verify Account",
          data: response,
          errorIsPresent: false,
        });
      })
      .catch((error) => {
        return res.render("auth/verifyAccount", {
          message: "Something went wrong. Try again",
          title: "Error",
          errorIsPresent: true,
          error,
        });
      });
  });
}

export function getLoginUser(req, res, next) {
  res.render("auth/login", {
    pageTitle: "Create Account",
    path: "/auth/login",
    title: "Login",
  });
}

// login user
export function loginUser(req, res) {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((response) => {
      console.log(req.session);
      if (!response) {
        return res.render("auth/verifyAccount", {
          message: "Email does not exist",
          title: "Verify Account",
          data: response,
          errorIsPresent: false,
        });
      }
      if (!response.active) {
        return res.render("auth/verifyAccount", {
          message: "Account is inactive",
          title: "Account",
          errorIsPresent: true,
        });
      }
      if (!response.verified) {
        return res.render("auth/verifyAccount", {
          message: "Account has not been verified",
          title: "Error",
          errorIsPresent: true,
        });
      }
      compare(password, response.password).then((decrptedPassword) => {
        if (!decrptedPassword) {
          return res.render("auth/verifyAccount", {
            message: "Wrong password",
            title: "Error",
            errorIsPresent: true,
          });
        }
        const payload = {
          id: response.id,
          email: response.email,
        };
        sign(payload, process.env.SECRET_KEY, (err, token) => {
          if (err) {
            return res.render("auth/verifyAccount", {
              message: "Something went happen. Try again.",
              title: "Error",
              errorIsPresent: true,
              error: err,
            });
          }
          req.session.isLoggedIn = true;
          req.session.user = response._id;
          req.session.save((err) => {
            return res.render("auth/verifyAccount", {
              message: "Login Successful",
              title: "Success Login",
              errorIsPresent: false,
              data: response,
            });
          });
        });
      });
    })
    .catch((error) => {
      return res.render("auth/verifyAccount", {
        message: "Something went happen. Try again",
        title: "Error",
        errorIsPresent: true,
      });
    });
}

// Logout
export function Logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(SERVICE_UNAVAILABLE)
        .json({ message: "Something went wrong. Try again" });
    }
    return res.status(OK).json({ message: "Logout successful" });
  });
}

// verify account
export function verifyAccount(req, res) {
  const { email } = req.params;
  User.findOneAndUpdate({ email }, { verified: true })
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .json({ message: `Account ${email} does not exist` });
      }
      return res
        .status(OK)
        .json({ message: "Account has been verified", data: user });
    })
    .catch((error) => {
      return res
        .status(SERVICE_UNAVAILABLE)
        .json({ message: "Something went happen. Try again", error });
    });
}
