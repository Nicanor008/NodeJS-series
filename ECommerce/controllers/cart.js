const Cart = require("../models/cart");

// add single product to the cart
exports.createCart = (req, res) => {
  if (!req.body.productId) {
    res.status(404).json({ message: "Product is required" });
  }
  try {
    const cart = new Cart(req.body);
    cart.save().then((response) => {
      return res
        .status(201)
        .json({ message: "Product added to cart", data: response });
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try again", error });
  }
};

// fetch all products in a cart
exports.fetchCart = async (req, res) => {
  await Cart.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "buyerUserId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$user" },
    { $unwind: "$product" },
  ])
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          message: `No Products available`,
        });
      }
      let allProducts = [];
      data.filter((d) => {
        if (req.id === String(d.user._id)) {
          allProducts.push(d)
          return res.status(200).json({
            message: `${allProducts.length} ${allProducts.length > 1 ? `Products`: `Product`} in your cart`,
            data: allProducts,
          });
        }
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Something went wrong. Try again", error });
    });
};

// delete a product from the cart
// protected endpoint
exports.deleteProduct = (req, res) => {
  Cart.findById({ _id: req.params.id })
    .then((data) => {
      const user = String(data.buyerUserId);
      const loggedInUser = req.id;
      if (loggedInUser !== user) {
        return res
          .status(403)
          .json({ message: "Forbidden Access you can't delete this item" });
      }
      Cart.findByIdAndDelete({ _id: req.params.id }).then((response) => {
        return res.status(200).json({ message: "Product removed", response });
      });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Something went Wrong. Try again", error });
    });
};

// update
exports.updateCartProduct = (req, res) => {
  const { productId, buyerUsedId, quantity } = req.body;
  User.findByIdAndUpdate(
    { _id: req.params.id },
    { productId, buyerUsedId, quantity }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: `Product not available`,
        });
      }
      return res
        .status(200)
        .json({ message: "Product has been updated", data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Something went wrong. Try again", error });
    });
};
