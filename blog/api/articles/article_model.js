const mongoose = require("mongoose");
const mongooseSlugPlugin = require('mongoose-slug-plugin');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true
    },
    body: {
      type: String,
      required: true,
    },
    tags: [{}],
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    coverImage: {
      type: String,
      required: false,
    },
    draft: {
        type: Boolean,
        required: true,
        default: true,
    },
    views: {
        type: Number
    }
  },
  { timestamps: true }
);

articleSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=title%>' });

module.exports = mongoose.model("Article", articleSchema);
