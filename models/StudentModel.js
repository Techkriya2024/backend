const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  year: {
    type: Number,
    required: true,
  },
  college: {
    type: String,
    required: [true, "College is required"],
    trim: true,
  },
  reg_no: {
    type: String,
    required: [true, "Registration number is required"],
    unique: true,
    match: [/^\d+$/, "Only digits are allowed"],
  },
  coins: {
    type: Number,
    default: 0,
  },
  outsider: {
    type: Boolean,
  },
  visited_events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
