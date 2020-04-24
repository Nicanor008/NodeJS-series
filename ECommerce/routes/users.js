const express = require("express");
const is_Auth = require("../middlewares/is_auth")

const userControllers = require("../controllers/users")

const router = express.Router();

// get all users
router.get("/", is_Auth ,userControllers.getAllUsers)

// find single user
router.get("/:id", is_Auth, userControllers.getSingleUser)

module.exports = router;
