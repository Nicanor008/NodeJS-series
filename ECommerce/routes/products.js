const express = require("express")

const productControllers = require("../controllers/products")
const is_Auth = require("../middlewares/is_auth")

const router = express.Router();

// create products
router.post("/", is_Auth, productControllers.createProduct)

// fetch all products
router.get("/", productControllers.fetchAllProducts)

// fetch a single product
router.get("/:id", productControllers.fetchSingleProduct)

// fetch all products from a specific user
router.get("/user/:userId", productControllers.fetchUserProducts)

// update product
router.patch("/:id", is_Auth, productControllers.updateSingleProduct)

// delete product
router.delete("/:id", is_Auth, productControllers.deleteProduct)

// delete many products
router.delete("/user/:userId", is_Auth, productControllers.deleteManyProducts)

// search products by product name
router.get("/search/:name", productControllers.searchProducts)

module.exports = router;
