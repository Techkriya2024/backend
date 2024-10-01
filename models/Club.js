const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
    club_id: {type: String, required: true, unique: true},
    club_name: {type: String, required: true},
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Club', clubSchema);
