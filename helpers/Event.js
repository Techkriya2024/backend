const {Event} = require('../models');

const findEventById = async (eventId) => {
    try {
        return await Event.findById(eventId);
    } catch (error) {
        throw new Error("Event not found");
    }
};

const findEventsByIds = async (eventIds) => {
    try {
        return await Event.find({_id: {$in: eventIds}});
    } catch (error) {
        throw new Error("Error fetching events");
    }
};

const addRegisteredUser = async (eventId, userId) => {
    try {
        return await Event.findByIdAndUpdate(eventId, {$push: {registered_users: userId}}, {new: true});
    } catch (error) {
        throw new Error("Error registering user for event");
    }
};

const addVisitedUser = async (eventId, userId) => {
    try {
        return await Event.findByIdAndUpdate(eventId, {$push: {visited_users: userId}}, {new: true});
    } catch (error) {
        throw new Error("Error adding visited user");
    }
};

module.exports = {
    findEventById,
    findEventsByIds,
    addRegisteredUser,
    addVisitedUser,
};
