const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    year: {type: Number, required: true},
    college: {type: String, required: true},
    reg_no: {type: String, required: true},
    coins: {type: Number, default: 0},
    outsider: {type: Boolean, default: false},
    registered_events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
    visited_events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
