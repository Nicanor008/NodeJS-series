import User from "./users_models";
import { NOT_FOUND, SERVICE_UNAVAILABLE, OK } from "http-status";

// all users
export function fetchAllUsers(req, res) {
  const { role } = req.params;
  User.find()
    .then((users) => {
      if (users.length === 0) {
        res
          .status(NOT_FOUND)
          .json({ message: "No users available" });
      }
      return res.render("users/", {
        pageTitle: "All users",
        path: "/users",
        title: "Users",
        data: users
      });
    })
    .catch((error) => {
      return res
        .status(SERVICE_UNAVAILABLE)
        .json({ message: "Something went happen. Try again", error });
    });
}

// filter all authors
// search users as per users name or role
export function fetchOnlyAuthors(req, res) {
  //   User.find({ role: { '$regex': name }})
  const { name } = req.params
  User.aggregate([
    {
      $match:{
        $or: [
          { role: { '$regex': name } },
          { name: { '$regex': name } }
        ],
    }
    },
  ])
    .then((users) => {
      if (users.length === 0) {
        res
          .status(NOT_FOUND)
          .json({ message: "No users available" });
      }
      return res
        .status(OK)
        .json({
          message: `${users.length} users with ${req.params.name}`,
          data: users,
        });
    })
    .catch((error) => {
      return res
        .status(SERVICE_UNAVAILABLE)
        .json({ message: "Something went happen. Try again", error });
    });
}
