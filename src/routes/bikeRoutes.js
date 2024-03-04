const express = require("express");
const router = express.Router();

const bikeController = require("../controllers/bikeController");

router.post("/upload", bikeController.upload);
router.get("/user/:username", bikeController.getBikesByUsername);
router.get("/rentBikes", bikeController.getBikesWithFilter);
router.post("/edit/:id", bikeController.edit);

module.exports = router;
