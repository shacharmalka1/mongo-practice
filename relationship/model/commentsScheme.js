const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Comment", CommentSchema);
