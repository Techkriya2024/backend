const {Event, Student} = require("../models");

const editUser = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const {name, email, password, year, college} = req.body;

        const updatedUser = await Student.findByIdAndUpdate(userId, {
            name,
            email,
            password,
            year,
            college
        }, {new: true});

        res.status(200).json({message: "User updated successfully", updatedUser});
    } catch (error) {
        res.status(500).json({message: "Error updating user", error});
    }
};

const registeredEvents = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const user = await Student.findById(userId);
        const registeredEvents = user.registered_events;

        const events = await Event.find({_id: {$in: registeredEvents}});

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: "Error fetching registered events", error});
    }
};

const visitedEvents = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const user = await findUserById(userId);
        const visitedEvents = user.visited_events;

        const events = await Event.find({_id: {$in: visitedEvents}});

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: "Error fetching visited events", error});
    }
};

const getRank = async (req, res) => {
    try {
        const userId = req.user.user_id;

        const users = await Student.find().sort({coins: -1});
        const rank = users.findIndex(user => user.user_id === userId) + 1;

        res.status(200).json({rank});
    } catch (error) {
        res.status(500).json({message: "Error fetching user rank", error});
    }
};

const registerNewEvent = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const eventId = req.params.eventId;

        const user = await Student.findById(userId);

        if (user.registered_events.includes(eventId) || user.visited_events.includes(eventId)) {
            return res.status(400).json({message: "User has already registered or visited this event"});
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({message: "Event not found"});
        }

        await Student.findByIdAndUpdate(userId, {$push: {registered_events: eventId}}, {new: true});
        await Event.findByIdAndUpdate(eventId, {$push: {registered_users: userId}}, {new: true});

        res.status(200).json({message: "Successfully registered for the event"});
    } catch (error) {
        res.status(500).json({message: "Error registering for event", error});
    }
};

module.exports = {
    editUser,
    registeredEvents,
    visitedEvents,
    getRank,
    registerNewEvent,
};
