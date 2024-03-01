const bikeModel = require("../models/bikeModel");

exports.upload = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { description, city, dateStart, dateEnd, price, username } = req.body;
    const imagePath = req.file.path;

    // Save the new bike in the database
    const result = await bikeModel.createBike(
      {
        image: imagePath,
        description,
        city,
        dateStart,
        dateEnd,
        price,
        username,
      },
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
