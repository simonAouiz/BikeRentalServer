const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { db } = require("./src/database/database"); // Import database connection

const app = express();

// Middleware
app.use(cors());
const upload = multer();
app.use(upload.none());

// Import user routes
const userRoutes = require("./src/routes/userRoutes");

// Use user routes
app.use("/users", userRoutes);

// Start the server
const port = process.env.PORT || 5500;

try {
  app.set("db", db);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch {
  console.error("Error opening database");
}
