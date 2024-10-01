const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  club_id: {
    type: String,
    required: [true, "Club ID is required"],
    unique: true,
    minlength: [6, "Club ID must be at least 6 characters long"],
  },
  club_name: {
    type: String,
    required: [true, "Club name is required"],
    trim: true,
    minlength: [3, "Club name must be at least 3 characters long"],
    maxlength: [50, "Club name cannot exceed 50 characters"],
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      validate: [arrayLimit, "Exceeds the limit of 50 events"],
    },
  ],
});

function arrayLimit(val) {
  return val.length <= 50;
}

const Club = mongoose.model("Club", ClubSchema);

module.exports = Club;
