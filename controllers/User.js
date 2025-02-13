const Student = require("../models/StudentModel");
const Event = require('../models/EventModel');
const {MailSender} = require('../utilities');

const editUser = async (req, res) => {
    try{
        const userId = req.user._id;
        const {name, email, password, year, college, image} = req.body;

        await Student.findByIdAndUpdate(userId, {
            name,
            email,
            password,
            year,
            college,
            image
        }, {new: true});

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message: "Error updating user", 
        });
    }
};

const registeredEvents = async(req, res) => {
    try{
        const userId = req.user._id;

        const user = await Student.findById(userId);
        const registeredEvents = user?.registered_events;

        const events = await Event.find({_id: {$in: registeredEvents}});

        return res.status(200).json({
            success: true,
            message: "Fetched Registered Events",
            data: events
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching registered events",
        });
    }
};

const visitedEvents = async (req, res) => {
    try{
        const userId = req.user._id;

        const user = await Student.findById(userId);
        const visitedEvents = user?.visited_events;

        const events = await Event.find({_id: {$in: visitedEvents}});

        return res.status(200).json({
            success: true,
            message: "Fetched Visited Events",
            data: events
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to Fetch Visited Events",
        })
    }
};

const getRank = async (req, res) => {
    try{
        const userId = req.user._id;

        const users = await Student.find().sort({coins: -1});
        const rank = users.findIndex(user => user.user_id === userId) + 1;

        return res.status(200).json({
            success: true,
            message: "Fetched User Rank",
            data: rank,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to Fetch User Rank",
        })
    }
};

const registerNewEvent = async (req, res) => {
    try{
        const userId = req.user._id;
        const eventId = req.params.eventId;

        const user = await Student.findById(userId);

        if(user?.registered_events.includes(eventId) || user?.visited_events.includes(eventId)){
            return res.status(400).json({
                success: false,
                message: "User has already registered or visited this event",
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        await Student.findByIdAndUpdate(userId, {$push: {registered_events: eventId}}, {new: true});
        await Event.findByIdAndUpdate(eventId, {$push: {registered_users: userId}}, {new: true});

        // Send Successful Registration Mail

        return res.status(200).json({
            success: true,
            message: "Successfully registered for the event"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error registering for event"
        });
    }
};

module.exports = {
    editUser,
    registeredEvents,
    visitedEvents,
    getRank,
    registerNewEvent,
};
