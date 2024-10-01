const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
    club_id: {
        type: String,
        required: [true, "ClubModel ID is required"],
        unique: true,
    },
    club_name: {
        type: String,
        required: [true, "ClubModel name is required"],
        trim: true,
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
});

const Club = mongoose.model("Club", ClubSchema);

module.exports = Club;