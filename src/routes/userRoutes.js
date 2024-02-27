const express = require("express");
const router = express.Router();

// Import user controller
const userController = require("../controllers/userController");

// Define routes
router.post("/signup", userController.signup);
router.post("/signin", userController.signIn);

module.exports = router;
