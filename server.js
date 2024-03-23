const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { db } = require("./src/database/database");

const app = express();

// Middleware
app.use(cors());

// Configure multer to store uploaded files in the 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Import user routes
const userRoutes = require("./src/routes/userRoutes");
const bikeRoutes = require("./src/routes/bikeRoutes");

// Use user routes
app.use("/users", upload.none(), userRoutes);
app.use("/bikes", upload.single("image"), bikeRoutes);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
