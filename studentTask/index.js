require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("./model/studentScheme");
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

  //   await Student.create({
  //     name: "Ido",
  //     surName: "Arbel",
  //     birth: 26 / 01 / 1998,
  //     phone: "0526305421",
  //     gender: "Male",
  //     courses: [" Java", "Math"],
  //   });

  //   await Student.create({
  //     name: "Chen",
  //     surName: "Halevi",
  //     birth: 11 / 03 / 1997,
  //     phone: "0526323421",
  //     gender: "Male",
  //     courses: ["Math", "Law"],
  //   });
  //   await Student.create({
  //     name: "Koren",
  //     surName: "Gan-or",
  //     birth: 19 / 01 / 1997,
  //     phone: "0526305321",
  //     gender: "Male",
  //     courses: ["JavaScript", "Finance", "Law"],
  //   });
  //   await Student.create({
  //     name: "Oryan",
  //     surName: "Levy",
  //     birth: 02 / 04 / 1998,
  //     phone: "0542305321",
  //     gender: "Male",
  //     courses: ["JavaScript", "Law"],
  //   });
  //   await Student.create({
  //     name: "Yahalom",
  //     surName: "Cohen",
  //     birth: 03 / 11 / 1993,
  //     phone: "0542305392",
  //     gender: "Female",
  //     courses: ["JavaScript", "Law"],
  //   });
}

connect();

const functions = {
  async studentList() {
    const res = await Student.find();
    console.log(res);
  },
  async ido() {
    const res = await Student.find({ name: "Ido" });
    console.log(res);
  },
  async law() {
    const res = await Student.find({ courses: "Law" });
    console.log(res);
  },
  async javaAndFemale() {
    const res = await Student.find({
      $and: [{ gender: "Female" }, { courses: "Java" }],
    });

    console.log(res);
  },
  async findYoungerDateStudents() {
    const res = await Student.find({ birth: { $gt: new Date("1998-05-05") } });
    console.log(res);
  },
  async findPhoneStudents() {
    //syntax to include start of string
    const res = await Student.find({ phone: { $in: /^054/ } });
    console.log(res);
  },
  async addYahalomJS() {
    await Student.updateMany(
      { name: "Yahalom" },
      { $push: { courses: "JavaScript" } }
    );
    const res = await Student.find({ name: "Yahalom" });
    console.log(res);
  },
  async updateKorenDate() {
    await Student.updateMany(
      { name: "Koren" },
      { birth: new Date("1998-12-02") }
    );
    const res = await Student.find({ name: "Koren" });
    console.log(res);
  },
  async findOStudents() {
    const res = await Student.find({ name: { $regex: "o" } });
    console.log(res);
  },
  async findHYStudents() {
    const res = await Student.find({
      $or: [{ name: { $regex: "h" } }, { name: { $regex: "y" } }],
    });
    console.log(res);
  },
  async deleteIdo() {
    await Student.findOneAndDelete({ name: "Ido" });
    console.log("you killed Ido! you bastards!");
  },
  async deleteByDate() {
    await Student.findOneAndDelete({ birth: new Date("1998-04-02") });
    console.log("You killed Oryan!Good job!");
  },
};
