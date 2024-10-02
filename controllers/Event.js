const Event = require("../models/EventModel");

const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event successfully created", event: newEvent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const deletedEvent = await Event.findOneAndDelete({ event_id });

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event successfully deleted", event: deletedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const updatedEvent = await Event.findOneAndUpdate({ event_id }, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event successfully updated", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { event_id } = req.params;
    const event = await Event.findOne({ event_id });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvent,
  deleteEvent,
  editEvent,
  getAllEvents,
  getEventById,
};
