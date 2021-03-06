require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./model/usersScheme");
const Post = require("./model/postsScheme");
const Comment = require("./model/commentsScheme");
const uri = `mongodb+srv://shachar:${process.env.PASSWORD}@cluster0.oriwg.mongodb.net/mongo_practice?retryWrites=true&w=majority`;
async function connect() {
  console.log(process.env.PASSWORD);
  await mongoose
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
}

connect();

const postsArray = [
  {
    username: "GoodGuyGreg",
    title: "Passes out at party",
    body: "Wakes up early and cleans house",
  },

  {
    username: "GoodGuyGreg",
    title: "Steals your identity",
    body: "Raises your credit score",
  },

  {
    username: "GoodGuyGreg",
    title: "Reports a bug in your code",
    body: "Sends you a Pull Request",
  },
  {
    username: "ScumbagSteve",
    title: "Borrows something",
    body: "Sells it",
  },
  {
    username: "ScumbagSteve",
    title: "Borrows everything",
    body: "The end",
  },
  {
    username: "ScumbagSteve",
    title: "Forks your repo on github",
    body: "Sets to private",
  },
];

async function insertUsers(usersArray) {
  await usersArray.forEach((user) => {
    User.create(user);
  });
}
async function insertPosts(postsArray) {
  await postsArray.forEach((post) => {
    Post.create(post);
  });
}

const usersArray = [
  {
    username: "GoodGuyGreg",
    first_name: "Good Guy",
    last_name: "Greg",
  },
  {
    username: "ScumbagSteve",
    first_name: "Scumbag",
    last_name: "Steve",
  },
];

async function addComment() {
  await Comment.create({
    username: "ScumbagSteve",
    comment: "Denied your PR cause I found a hack",
    post: "618d1d67b7736fd7b3c94dba",
  });
}

// insertUsers(usersArray);
// insertPosts(postsArray);
// addComment()

const query = {
  async findAllUsers() {
    const res = await User.find();
    console.log(res);
  },
  async findAllPost() {
    const res = await Post.find();
    console.log(res);
  },
  async findUserPosts(userName) {
    const res = await Post.find({ username: userName });
    console.log(res);
  },
  async findAllComments() {
    const res = await Commnet.find();
    console.log(res);
  },
  async findUserComments(userName) {
    const res = await Commnet.find({ username: userName });
    console.log(res);
  },
  async findPostComments() {
    const post = await Post.findOne({ title: "Steals your identity" });
    const res = await Commnet.find({ post: post._id });
    console.log(post._id);
    console.log(res);
  },
};

// query.findAllUsers()
// query.findAllPost()
// query.findUserPosts('GoodGuyGreg')
// query.findUserPosts('ScumbagSteve')
// query.findAllComments()
// query.findUserComments('GoodGuyGreg')
// query.findUserComments('ScumbagSteve')
// query.findPostComments()
