const mongoose = require("mongoose");
const QuestionScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Question", QuestionScheme);
