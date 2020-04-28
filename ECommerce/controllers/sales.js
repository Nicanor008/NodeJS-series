const Sale = require("../models/sales")

exports.buyProduct = (req, res) => {
    if(!req.body.productId) {
        res.status(404).json({ message: "Product is required" })
    }
    
}