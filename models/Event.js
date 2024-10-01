const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    event_id: {type: String, required: true, unique: true},
    club_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true},
    name: {type: String, required: true},
    image: {type: String, default: null},
    description: {type: String, required: true},
    link: {type: String, default: null},
    coins: {type: Number, required: true},
    registered_users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    visited_users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
