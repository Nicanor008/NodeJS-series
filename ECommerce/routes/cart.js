const express = require("express")

const cartControllers = require("../controllers/cart")
const is_Auth = require("../middlewares/is_auth")

const router = express.Router()

// create cart
router.post("/", cartControllers.createCart)

// fetch all products in a cart
router.get("/", is_Auth ,cartControllers.fetchCart)

// remove a product from the cart
router.delete("/:id", is_Auth, cartControllers.deleteProduct)

module.exports = router
