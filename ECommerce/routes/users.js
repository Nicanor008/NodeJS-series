const express = require("express");
const is_Auth = require("../middlewares/is_auth")

const userControllers = require("../controllers/users")

const router = express.Router();

router.get("/", is_Auth ,userControllers.getAllUsers)

module.exports = router;
