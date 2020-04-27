const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    addedByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: String,
      required: false,
    },
    currency: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
