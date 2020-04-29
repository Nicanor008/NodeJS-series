const express = require("express")
const salesControllers = require("../controllers/sales")
const is_Auth = require("../middlewares/is_auth")

const router = express.Router()

router.post("/", is_Auth, salesControllers.CreateSale)

module.exports = router;
