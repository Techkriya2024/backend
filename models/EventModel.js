const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    event_id: {
        type: String,
        required: [true, "EventModel ID is required"],
        unique: true,
    },
    club_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
        required: [true, "Club ID is required"],
    },
    name: {
        type: String,
        required: [true, "EventModel name is required"],
        trim: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    link: {
        type: String,
    },
    coins: {
        type: Number,
        default: 20,
        required: [true, "Coins are required"],
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