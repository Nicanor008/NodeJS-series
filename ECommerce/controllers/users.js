const User = require('../models/user')

// get all users
exports.getAllUsers = (req, res, next) => {
    User.find()
      .then(products => {
        res.status(200).json({ message: 'fetched.', post: products });
      })
      .catch(err => {
        console.log(err);
      });
  };
