const express = require("express");
const router = express.Router();

const {authMiddlewares} = require("../middlewares");
const {clubController} = require('../controllers');

// WRITE ROUTES HERE
router.post("/clubs", authMiddlewares, clubController.createClub);

router.put("/clubs/:clubId", authMiddlewares, clubController.editClub);


router.delete("/clubs/:clubId", authMiddlewares, clubController.deleteClub);


router.get("/clubs", clubController.getAllClubs);


router.get("/clubs/:clubId", clubController.getClubById);


router.get("/clubs/:clubId/events", clubController.getClubEvents);
module.exports = router;