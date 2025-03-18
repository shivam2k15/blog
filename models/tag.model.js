const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Tag Schema
 * @typedef {Object} Tag
 * @property {string} name - Unique name of the tag with limit length of 50 char.
 */

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
