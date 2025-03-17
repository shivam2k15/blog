const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    maxLength: 50,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
