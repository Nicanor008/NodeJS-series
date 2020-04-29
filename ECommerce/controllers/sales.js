const Sale = require("../models/sales")
const Cart = require("../models/cart")

exports.CreateSale = (req, res) => {
    if(!req.body.productId) {
        res.status(404).json({ message: "Product is required" })
    }
    const sale = new Sale(req.body)
    sale.save().then(data => {
        // delete cart after wards
        Cart.deleteMany({ buyerUsedId: req.id }).then(() => {
            res.status(201).json({ message: "Sale has been recorded", data })
          })
    }).catch(error => {
        res.status(500).json({ message: "Something went wrong. Try again", error })
    })
}

// view sales
