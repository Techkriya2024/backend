const express = require("express");
const router = express.Router();

const {authMiddlewares} = require("../middlewares");
const {userController} = require("../controllers");

router.put("/editUser", authMiddlewares, userController.editUser);
router.get("/registeredEvents", authMiddlewares, userController.registeredEvents);
router.get("/visitedEvents", authMiddlewares, userController.visitedEvents);
router.get("/fetchRank", authMiddlewares, userController.getRank);
router.post("/register/:eventId", authMiddlewares, userController.registerNewEvent);

module.exports = router;