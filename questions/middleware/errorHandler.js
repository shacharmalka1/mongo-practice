const Question = require("../model/questionsScheme");

/* Middleware that make sure that all properties are valid before update ot create a question.  */
/* If something isn't valid the middleware will mention the problem and the appropriate status. */
async function addOrUpdateQuestionErrorHandler(req, res, next) {
  const validationCheck = await validateReqest(req.body);
  if (req.body.hasOwnProperty("_id")) {
    //If get some id too we have to validate it
    if (!(await isIdExist(req.body._id))) return "id is not exist";
  }
  if (validationCheck !== true) {
    return res.status(422).send(`Error: ${validationCheck}`);
  } else next();
}

/* Get the id's of all documents in the database. */
async function getAll_Ids() {
  let questionIdsArray = [];
  const questionsArray = await Question.find();
  questionsArray.forEach((question) => {
    question = String(question._id)
      .replace("new ObjectId(", "")
      .replace(")", "");
    questionIdsArray.push(question);
  });
  return questionIdsArray;
}

/* Get an id and check if it's belongs to some document in the database. */
/* Returns true if the id belongs to some document and otherwise returns false . */
async function isIdExist(_id) {
  const array = await getAll_Ids();
  return array.includes(_id);
}

async function idNotExistHandler(req, res, next) {
  if (!(await isIdExist(req.params.id)))
    return res.status(422).send("id is not exist");
  next();
}

/* Get question object and check it. */
/* If everything is valid return true else returns the problem. */
async function validateReqest(question) {
  if (!(typeof question.title === "string" && question.title !== ""))
    return "title must be String and and not empty one";
  if (
    !(
      typeof question.correctAnswer === "string" &&
      question.correctAnswer !== ""
    )
  )
    return "correctAnswer must be String and not empty one";
  if (!(question.answers instanceof Array))
    return "answers must be Array and not empty one";
  if (!isArrayContainsSrings(question.answers))
    return "answers elements must be Strings and not empty one";
  if (!(typeof question.difficulty === "number"))
    return "difficulty must be Number";
  return true;
}

/* Get an array and check if all the elemnts are srings or not. */
function isArrayContainsSrings(answers) {
  return answers.every(
    (aswer) => typeof aswer === "string" && aswer.length !== 0
  );
}

const middleware = { addOrUpdateQuestionErrorHandler, idNotExistHandler };
module.exports = middleware;
