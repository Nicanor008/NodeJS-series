const express = require("express")
const users = require("../controllers/users")

const router = express.Router()

router.route("/").get(users.fetchAllUsers)
router.route("/:name").get(users.fetchOnlyAuthors)

module.exports = router
