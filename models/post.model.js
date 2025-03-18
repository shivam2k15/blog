const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Post Schema
 * @typedef {Object} Post
 * @property {string} title - Title of the post with length limit of 100 char.
 * @property {string} desc - Description of the post  with length limit of 2000 char.
 * @property {string} image - URL of the uploaded image.
 * @property {Array.<mongoose.Schema.Types.ObjectId>} tags - List of associated tag IDs.
 */

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 2000,
    },
    image: String,
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
