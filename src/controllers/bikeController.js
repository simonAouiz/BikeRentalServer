const bikeModel = require("../models/bikeModel");

exports.upload = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { description, city, dateStart, dateEnd, price } = req.body; // get other fields from the form
    const imagePath = req.file.path; // get the path of the uploaded image

    // Save the new bike in the database
    const result = await bikeModel.createBike(
      { image: imagePath, description, city, dateStart, dateEnd, price },
      db
    );

    res
      .status(200)
      .json({ message: "Bike uploaded successfully", bike: result });
  } catch (error) {
    console.error("Error uploading bike:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
