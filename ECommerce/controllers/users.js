const User = require("../models/user");

const ITEMS_PER_PAGE = 10;

// get all users
exports.getAllUsers = (req, res) => {
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
        lastPage: Math.ceil(total / ITEMS_PER_PAGE),
      };
      res.status(200).json({
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

// get single user 
exports.getSingleUser = (req, res) => {
  User.findById({ _id: req.params.id })
    .then((response) => {
      if (!response) {
        return res.status(404).json({ message: "User does not exist" });
      }
      if (req.id === req.params.id) {
        return res
          .status(200)
          .json({ message: "Your Profile", data: response });
      }
      return res
        .status(200)
        .json({ message: "User Fetched successfully", data: response });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

// update user account
exports.updateUserAccount = (req, res) => {
  const { role, username } = req.body;
  if(req.id !== req.params.id) {
    return res.status(403).json({ message: "Unathorised, you can only update your account" })
  }
  User.findOneAndUpdate({ _id:req.params.id }, {
    role, username
  }).then(response => {
    return res.status(200).json({ message: "user updated successfully", data: response })
  }).catch(() => {
    res.status(500).json({ message: "Something unexpected happened. Try again"})
  })
}

// soft delete account
exports.softDeleteUserAccount = (req, res) => {
  if(req.id !== req.params.id) {
    return res.status(403).json({ message: "Unathorised, you can't delete someone's account" })
  }
  User.findByIdAndUpdate({ _id:req.params.id  }, { active: false }).then(response => {
    res.status(200).json({ message:"Account has been deactivated" })
  }).catch(error => {
    return res.status(500).json({ message: "Something went wrong. Try again", error})
  })
}

// hard delete account
exports.deleteUserAccount = (req, res) => {
  if(req.id !== req.params.id) {
    return res.status(403).json({ message: "Unathorised, you can't delete someone's account" })
  }
  User.findByIdAndDelete({ _id:req.params.id }).then(() => {
    res.status(200).json({ message: "Account has been deleted" })
  }).catch(error => {
    res.status(500).json({ message: "Something Went Wrong. Try again" })
  })
}

// search users
exports.searchUsers = (req, res) => {
  User.find({ username: {'$regex': req.params.name } }).then(data => {
    if (data.length === 0) {
      return res.status(404).json({
        message: `${req.params.name} does not exist`,
      });
    }
    return res.status(200).json({ message: `${data.length} Users found`, data });
}).catch((error) => {
  res
    .status(500)
    .json({ message: "Something went wrong. Try again", error });
});
}
