const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surName: {
    type: String,
    require: true,
  },
  birth: {
    type: Date,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  courses: {
    type: Array,
    require: true,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
