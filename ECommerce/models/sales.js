const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: false
    },
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
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sales", salesSchema)
