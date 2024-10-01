const express = require("express");
const router = express.Router();

const {authMiddlewares} = require("../middlewares");
const {userController} = require("../controllers");

router.put("/edit", authMiddlewares, userController.editUser);
router.get("/events/registered", authMiddlewares, userController.registeredEvents);
router.get("/events/visited", authMiddlewares, userController.visitedEvents);
router.get("/rank", authMiddlewares, userController.getRank);
router.post("/events/register/:eventId", authMiddlewares, userController.registerNewEvent);

module.exports = router;