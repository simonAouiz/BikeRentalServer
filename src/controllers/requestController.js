const requestModel = require("../models/requestModel");

exports.request = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { bikeId, username } = req.body;

    const result = await requestModel.createRequest(
      {
        username,
        bikeId,
      },
      db
    );

    res
      .status(200)
      .json({ message: "Request sent successfully", request: result });
  } catch (error) {
    console.error("Error sending request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.displayRequestByBike = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { bikeID } = req.params;

    const result = await requestModel.getRequestsByBike({ bikeID }, db);

    res
      .status(200)
      .json({ message: "Got requests successfully", requests: result });
  } catch (error) {
    console.error("Error getting requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.displayRequestByRequester = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { username } = req.params;

    const result = await requestModel.getRequestsByRequester({ username }, db);

    res
      .status(200)
      .json({ message: "Got requests successfully", requests: result });
  } catch (error) {
    console.error("Error getting requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { requestID } = req.params;

    console.log(req.params);

    await requestModel.updateRequestStatus(
      { requestID, status: "rejected" },
      db
    );

    res.status(200).json({ message: "Request rejected successfully" });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { requestID } = req.params;

    await requestModel.updateRequestStatus(
      { requestID, status: "accepted" },
      db
    );

    res.status(200).json({ message: "Request accepted successfully" });
  } catch (error) {
    console.error("Error accepted request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteRequest = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { requestID } = req.params;

    await requestModel.deleteRequest(requestID, db);

    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
