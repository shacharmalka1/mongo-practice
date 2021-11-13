require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Question = require("./model/questionsScheme");
const middleware = require("./middleware/errorHandler");
const uri = `mongodb+srv://shachar:${process.env.PASSWORD}@cluster0.oriwg.mongodb.net/mongo_practice?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch(() => {
    console.log("connection to database failed");
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const questionsArray = [
//   {
//     title: "What is nodejs",
//     correctAnswer: "A JavaScript runtime environment",
//     answers: [
//       "A JavaScript runtime environment",
//       "A c# extension",
//       "Irish children's story",
//     ],
//     difficulty: 4,
//   },
//   {
//     title: "What is recursion in a programming language",
//     correctAnswer:
//       "A technique to iterate over an operation by having a function call itself repeatedly until it arrives at a result.",
//     answers: [
//       "When a senior tells you to rewrite your function",
//       "A technique to iterate over an operation by having a function call itself repeatedly until it arrives at a result",
//       "When you get up in the morning and miraculously your bug is fixed",
//     ],
//     difficulty: 3,
//   },
//   {
//     title: "What is DOM",
//     correctAnswer:
//       "Document Object Model is a programming interface for HTML and XML documents",
//     answers: [
//       "Done On Morning A technique to a healthy work life",
//       "Document Object Maintain is a design pattern to save your front the correct way",
//       "Document Object Model is a programming interface for HTML and XML documents",
//     ],
//     difficulty: 7,
//   },
//   {
//     title: "What is Object Destructuring",
//     correctAnswer: "A new way to extract elements from an object or an array.",
//     answers: [
//       "A new way to extract elements from an object or an array",
//       "A Memory Management feature that helps the garbage collector in js",
//       "Document Object Model is a programming interface for HTML and XML documents",
//     ],
//     difficulty: 8,
//   },
// ];

// async function insertQuestions(questionArray) {
//   await questionArray.forEach((question) => {
//     Question.create(question);
//   });
// }
// insertQuestions(questionsArray);

app.get("/list", async (req, res) => {
  res.send(await Question.find());
});

app.put(
  "/update",
  middleware.addOrUpdateQuestionErrorHandler,
  async (req, res) => {
    const update = await Question.findOneAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        correctAnswer: req.body.correctAnswer,
        answers: req.body.answers,
        difficulty: req.body.difficulty,
      }
    );
    res.send("update");
  }
);

app.post(
  "/create",
  middleware.addOrUpdateQuestionErrorHandler,
  async (req, res) => {
    await Question.create({
      title: req.body.title,
      correctAnswer: req.body.correctAnswer,
      answers: req.body.answers,
      difficulty: req.body.difficulty,
    });
    res.send("question added");
  }
);

app.delete("/remove/:id", middleware.idNotExistHandler, async (req, res) => {
  await Question.deleteOne({ _id: req.params.id });
  res.send("deleted");
});

app.get("/read/by/difficulty/:difficulty", async (req, res) => {
  const list = await Question.find({
    difficulty: { $gte: req.params.difficulty },
  });
  if (listOfGreaterOrEqualDiff.length === 0)
    return res.send("There is no such question with this difficulty level");
  res.send(`list of all difficulty ${req.params.difficulty}:${list}`);
});

app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
