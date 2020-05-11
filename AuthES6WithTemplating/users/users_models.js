import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    password: {
        type: String,
        required: true
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    pictureUrl: {
        type: String,
        required: false
    }
  },
  { timestamps: true }
);

export default model("User", userSchema)
