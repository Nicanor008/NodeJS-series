const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tags: [{}],
    startTime: {
      type: Date,
      required: false,
    },
    endTime: {
      type: Date,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    archived: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
