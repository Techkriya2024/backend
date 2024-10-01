const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  event_id: {
    type: String,
    required: [true, "Event ID is required"],
    unique: true,
    minlength: [6, "Event ID must be at least 6 characters long"],
  },
  club_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: [true, "Club ID is required"],
  },
  name: {
    type: String,
    required: [true, "Event name is required"],
    trim: true,
    minlength: [3, "Event name must be at least 3 characters long"],
    maxlength: [100, "Event name cannot exceed 100 characters"],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  link: {
    type: String,
  },
  coins: {
    type: Number,
    required: [true, "Coins are required"],
    min: [0, "Coins cannot be negative"],
  },
  registered_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  visited_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
