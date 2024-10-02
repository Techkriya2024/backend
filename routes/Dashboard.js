const express = require("express");
const router = express.Router();

const {authMiddlewares} = require("../middlewares");
const {dashboardController} = require('../controllers');

// WRITE ROUTES HERE
router.get("fetchAllEventsWithRegisteredAndVisitedUsers",authMiddlewares,dashboardController.fetchAllEventsWithRegisteredAndVisitedUsers);
router.get("fetchEventById",authMiddlewares,dashboardController.fetchEventById);
router.get("fetchAllEventsConductedByClubs",authMiddlewares,dashboardController.fetchAllEventsConductedByClubs);
router.get("fetchUserStastistics",authMiddlewares,dashboardController.fetchUserStastistics);

module.exports = router;