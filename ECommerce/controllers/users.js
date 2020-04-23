const User = require("../models/user");

const ITEMS_PER_PAGE = 2;

// get all users
exports.getAllUsers = (req, res, next) => {
  const page = +req.query.page || 1;
  let total;
  User.find()
    .countDocuments()
    .then((numUsers) => {
      total = numUsers;
      return User.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: "No Registered Users" });
      }
      const pagination = {
        total,
        hasNextPage: ITEMS_PER_PAGE * page < total,
        hasPreviousPage: page > 1,
        currentPage: page,
        previousPage: page - 1,
        nextPage: page + 1,
        lastPage: Math.ceil(total / ITEMS_PER_PAGE)
      }
      res
        .status(200)
        .json({
          message: "Users fetched",
          pagination,
          users,
        });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Something went wrong, Try again", error });
    });
};
