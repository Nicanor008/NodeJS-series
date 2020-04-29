const express = require("express")
const rateControllers = require("../controllers/rates")

const router = express.Router()

// post rate
router.post("/", rateControllers.CreateProductRating)

// get product ratings
router.get("/:id", rateControllers.fetchProductRatings)

module.exports = router
