const {User} = require('../models');

const updateUser = async (userId, updatedData) => {
    try {
        return await User.findByIdAndUpdate(userId, updatedData, {new: true});
    } catch (error) {
        throw new Error("Error updating user");
    }
};

const findUserById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        throw new Error("User not found");
    }
};

const getAllUsersSortedByCoins = async () => {
    try {
        return await User.find().sort({coins: -1});
    } catch (error) {
        throw new Error("Error fetching users");
    }
};

const addRegisteredEvent = async (userId, eventId) => {
    try {
        return await User.findByIdAndUpdate(userId, {$push: {registered_events: eventId}}, {new: true});
    } catch (error) {
        throw new Error("Error registering user for event");
    }
};

const addVisitedEvent = async (userId, eventId) => {
    try {
        return await User.findByIdAndUpdate(userId, {$push: {visited_events: eventId}}, {new: true});
    } catch (error) {
        throw new Error("Error adding visited event");
    }
};

module.exports = {
    updateUser,
    findUserById,
    getAllUsersSortedByCoins,
    addRegisteredEvent,
    addVisitedEvent,
};