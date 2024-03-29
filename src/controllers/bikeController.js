const bikeModel = require("../models/bikeModel");
// For removing uploaded image after removing bike from db
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

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

    const result = await bikeModel.getBikesByUser({ username }, db);

    res.status(200).json({ message: "Got bikes successfully", bikes: result });
  } catch (error) {
    console.error("Error getting bikes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBikesWithFilter = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { city, startDate, endDate } = req.query;

    const filter = {};
    if (city) filter.city = city;
    if (startDate) {
      filter.dateStart = startDate;
    }
    if (endDate) {
      filter.dateEnd = endDate;
    }

    const bikes = await bikeModel.getBikesFilteredFromDB(filter, db);

    res.status(200).json({ message: "Got bikes successfully", bikes });
  } catch (error) {
    console.error("Error getting bikes with filter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.edit = async (req, res) => {
  try {
    const db = req.app.get("db");
    const { description, city, dateStart, dateEnd, price } = req.body;
    const id = req.params.id;

    let result;

    if (req.file) {
      const imagePath = req.file.path;
      result = await bikeModel.editBike(
        {
          image: imagePath,
          description,
          city,
          dateStart,
          dateEnd,
          price,
          id,
        },
        db
      );
    } else {
      result = await bikeModel.editBikeWithoutImage(
        {
          description,
          city,
          dateStart,
          dateEnd,
          price,
          id,
        },
        db
      );
    }

    res.status(200).json({ message: "Bike edited successfully", bike: result });
  } catch (error) {
    console.error("Error editing bike:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const db = req.app.get("db");
    const id = req.params.id;

    const bike = await bikeModel.getBikeByID(id, db);

    const result = await bikeModel.removeBike(id, db);

    try {
      await unlinkFile(bike.image);
    } catch (unlinkError) {
      console.error("Error removing image file:", unlinkError);
    }

    res
      .status(200)
      .json({ message: "Bike removed successfully", bike: result });
  } catch (error) {
    console.error("Error removing bike:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBikeByID = async (req, res) => {
  try {
    const db = req.app.get("db");
    const id = req.params.id;

    const bike = await bikeModel.getBikeByID(id, db);

    res.status(200).json({ message: "Bike fetched successfully", bike: bike });
  } catch (error) {
    console.error("Error fetching bike:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
