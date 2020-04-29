const express = require("express");
const is_Auth = require("../middlewares/is_auth")

const userControllers = require("../controllers/users")

const router = express.Router();

// get all users
router.get("/", is_Auth, userControllers.getAllUsers)

// find single user
router.get("/:id", is_Auth, userControllers.getSingleUser)

// update/put/patch existing user
router.patch("/:id", is_Auth, userControllers.updateUserAccount)

// soft delete/deactivate account
// router.patch()

// hard delete
router.delete("/:id", is_Auth, userControllers.deleteUserAccount)

// search users
router.get("/search/:name", userControllers.searchUsers)

module.exports = router;
