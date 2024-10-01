const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User ID is required"],
    unique: true,
    minlength: [6, "User ID must be at least 6 characters long"],
  },
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
    minlength: [8, "Password must be at least 8 characters long"],
  },
  year: {
    type: Number,
    required: true,
    min: [1, "Year cannot be less than 1"],
    max: [4, "Year cannot be more than 4"],
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
    match: [/^\d{8}$/, "Registration number must be exactly 8 digits"],
  },
  coins: {
    type: Number,
    default: 0,
    min: [0, "Coins cannot be negative"],
  },
  outsider: {
    type: Boolean,
    default: false,
  },
  registered_events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  visited_events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
