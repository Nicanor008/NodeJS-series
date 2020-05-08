const express = require("express")
const users = require("./users_controllers")

const router = express.Router()

router.route("/").get(users.fetchAllUsers)

module.exports = router
