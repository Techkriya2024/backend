const Club = require("../models/Club");


exports.createClub = async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.editClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.clubId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.status(200).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.status(200).json({ message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch list of events organized by the club
exports.getClubEvents = async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId).populate("events");
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.status(200).json(club.events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
