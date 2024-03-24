const express = require("express");
const router = express.Router();

const requestController = require("../controllers/requestController");

router.post("/createRequest", requestController.request);
router.get("/display/bike/:bikeID", requestController.displayRequestByBike);
router.get(
  "/display/user/:username",
  requestController.displayRequestByRequester
);
router.patch("/reject/:requestID", requestController.rejectRequest);
router.patch("/accept/:requestID", requestController.acceptRequest);
router.delete("/:requestID", requestController.deleteRequest);

module.exports = router;
