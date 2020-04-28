const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    buyerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    quantity: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema)
