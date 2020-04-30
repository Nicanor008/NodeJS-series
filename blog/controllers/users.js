const User = require("../models/users");
const statusCode = require("http-status");

// all users
exports.fetchAllUsers = (req, res) => {
  const { role } = req.params;
  User.find()
    .then((users) => {
      if (users.length === 0) {
        res
          .status(statusCode.NOT_FOUND)
          .json({ message: "No users available" });
      }
      return res
        .status(statusCode.OK)
        .json({ message: "All users", data: users });
    })
    .catch((error) => {
      return res
        .status(statusCode.SERVICE_UNAVAILABLE)
        .json({ message: "Something went happen. Try again", error });
    });
};

// filter all authors
// search users as per users name or role
exports.fetchOnlyAuthors = (req, res) => {
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
          .status(statusCode.NOT_FOUND)
          .json({ message: "No users available" });
      }
      return res
        .status(statusCode.OK)
        .json({
          message: `${users.length} users with ${req.params.name}`,
          data: users,
        });
    })
    .catch((error) => {
      return res
        .status(statusCode.SERVICE_UNAVAILABLE)
        .json({ message: "Something went happen. Try again", error });
    });
};
