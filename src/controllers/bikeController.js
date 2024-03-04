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

exports.getBikesByUsername = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { username } = req.params;

    const result = await bikeModel.getBikesFromDB({ username }, db);

    res.status(200).json({ message: "Got bikes successfully", bikes: result });
  } catch (error) {
    console.error("Error getting bikes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBikesWithFilter = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { city, startDate, endDate } = req.query; // Extract parameters from req.query
    console.log(city, startDate, endDate);

    // Build filter object based on provided parameters
    const filter = {};
    if (city) filter.city = city;
    if (startDate && endDate) {
      filter.dateStart = { $gte: startDate };
      filter.dateEnd = { $lte: endDate };
    }

    // Get bikes from the database based on the filter
    const result = await bikeModel.getBikesFilteredFromDB(filter, db);

    res.status(200).json({ message: "Got bikes successfully", bikes: result });
  } catch (error) {
    console.error("Error getting bikes with filter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
