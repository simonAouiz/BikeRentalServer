const express = require("express");
const router = express.Router();

const bikeController = require("../controllers/bikeController");

router.post("/upload", bikeController.upload);

router.get("/user/:username", bikeController.getBikesByUsername);

module.exports = router;
