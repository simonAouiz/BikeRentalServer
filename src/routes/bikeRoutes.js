const express = require("express");
const router = express.Router();

const bikeController = require("../controllers/bikeController");

router.post("/upload", bikeController.upload);
router.get("/user/:username", bikeController.getBikesByUsername);
router.get("/rentBikes", bikeController.getBikesWithFilter);
router.get("/:id", bikeController.getBikeByID);
router.post("/edit/:id", bikeController.edit);
router.delete("/remove/:id", bikeController.remove);

module.exports = router;
