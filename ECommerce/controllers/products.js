const mongoose = require("mongoose");
const Product = require("../models/products");

const ITEMS_PER_PAGE = 20;

// create new product
exports.createProduct = (req, res) => {
  if (!req.body.name) {
    res.status(404).json({ message: "Product Name is required" });
  }
  if (req.id !== req.body.addedByUserId) {
    res.status(403).json({ message: "Not authorised" });
  }
  try {
    const product = new Product(req.body);
    product.save().then((response) => {
      return res
        .status(201)
        .json({ message: "Product has been created", data: response });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// fetch all products
// non-authenticated
exports.fetchAllProducts = async (req, res) => {
  const page = +req.query.page || 1;
  let total;

  await Product.find()
    .countDocuments()
    .then((numProducts) => {
      total = numProducts;
    });
  const pagination = {
    total,
    hasNextPage: ITEMS_PER_PAGE * page < total,
    hasPreviousPage: page > 1,
    currentPage: page,
    previousPage: page - 1,
    nextPage: page + 1,
    lastPage: Math.ceil(total / ITEMS_PER_PAGE),
  };
  await Product.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "addedByUserId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $skip: (page - 1) * ITEMS_PER_PAGE,
    },
    {
      $limit: ITEMS_PER_PAGE,
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: "$_id",
        name: "$name",
        quantiy: "$quantity",
        currency: "$currency",
        price: "$price",
        category: "$category",
        description: "$description",
        addedBy: "$user",
        total: "",
        createdAt: "$createdAt",
        updatedAt: "$updatedAt",
      },
    },
  ])
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "No Product available" });
      }
      return res
        .status(200)
        .json({ message: "Products fetched", pagination, data });
    })
    .catch(() => {
      return res.status(500).json({ message: "Server eror. Try again" });
    });
};

// fetch a single product
// non-authenticated
exports.fetchSingleProduct = async (req, res) => {
  await Product.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
    {
      $lookup: {
        from: "users",
        localField: "addedByUserId",
        foreignField: "_id",
        as: "addedBy",
      },
    },
    { $unwind: "$addedBy" },
  ])
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message:
            "Product not available. Ensure you have selected an existing product",
        });
      }
      return res.status(200).json({ message: "Product fetched", data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Something went wrong. Try again", error });
    });
};

// fetch all products added by a specific user
exports.fetchUserProducts = async (req, res) => {
  await Product.aggregate([
    { $match: { addedByUserId: mongoose.Types.ObjectId(req.params.userId) } },
    {
      $lookup: {
        from: "users",
        localField: "addedByUserId",
        foreignField: "_id",
        as: "addedBy",
      },
    },
    { $unwind: "$addedBy" },
  ])
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          message: "User Doesn't have any products",
        });
      }
      return res.status(200).json({ message: "User Products", data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Something went wrong. Try again", error });
    });
};

// update product(single)
// protected route
exports.updateSingleProduct = async (req, res) => {
  const productId = req.params.id;
  await Product.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(productId) } },
    {
      $lookup: {
        from: "users",
        localField: "addedByUserId",
        foreignField: "_id",
        as: "addedBy",
      },
    },
    { $unwind: "$addedBy" },
  ])
    .then((product) => {
      const loggedIn = req.id;
      const user = product[0].addedBy._id;
      if (loggedIn !== String(user)) {
        return res
          .status(403)
          .json({ message: "Forbidden, you can't update this product" });
      }
      if (!product) {
        return res.status(404).json({ message: "Product unavailable" });
      }
      const { name, currency, price, description, category } = req.body;

      Product.findByIdAndUpdate(
        { _id: productId },
        { name, currency, price, description, category }
      ).then((data) => {
        return res.status(200).json({ message: "Product updated", data });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Something went wrong. Try again." });
    });
};

// delete product
exports.deleteProduct = (req, res) => {
  Product.findByIdAndRemove({ _id: req.params.id })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not available" });
      }
      return res
        .status(200)
        .json({ message: "Product has been Deleted", product });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Something went wrong. Try again", error });
    });
};

// delete many products
exports.deleteManyProducts = (req, res) => {
  Product.deleteMany({ addedByUserId: req.params.userId }).then((response) => {
    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: "User Doesn't have any products",
      });
    }
    return res
      .status(200)
      .json({ message: `${response.deletedCount} Products Deleted` });
  }).catch(() => {
      return res.status(500).json({ message: "Something went Wrong. Try again" })
  })
};

// search products by product name
exports.searchProducts = async(req, res) => {
    Product.find({ name: {'$regex': req.params.name} }).then(data => {
        if (data.length === 0) {
            return res.status(404).json({
              message: `${req.params.name} does not exist`,
            });
          }
          return res.status(200).json({ message: `${data.length} Products found`, data });
    }).catch((error) => {
        res
          .status(500)
          .json({ message: "Something went wrong. Try again", error });
      });
}