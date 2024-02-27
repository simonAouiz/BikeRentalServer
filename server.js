const express = require("express");
const bodyParser = require("body-parser");
const { openDatabase } = require("./src/database/database"); // Import database connection

const app = express();

// Middleware
app.use(bodyParser.json());

// Import user routes
const userRoutes = require("./src/routes/userRoutes");

// Use user routes
app.use("/users", userRoutes);

// Start the server
const port = process.env.PORT || 5500;

// Open the database connection
openDatabase()
  .then((db) => {
    app.set("db", db); // Set the database object in Express app

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error opening database:", err.message);
  });
