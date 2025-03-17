const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
