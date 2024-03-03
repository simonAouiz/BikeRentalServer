const userModel = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    db = req.app.get("db");
    const { full_name, username, password, email, phoneNumber } = req.body;
    // Check if user already exists
    const existingUser = await userModel.getUserByUsernameOrEmail(
      username,
      email,
      db
    );
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    // Create new user
    const newUser = await userModel.createUser({
      full_name,
      username,
      password,
      email,
      phoneNumber,
      db,
    });
    res.json({ message: "User signed up successfully", user: newUser });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user exists and password is correct
    const user = await userModel.getUserByUsername(username, req.app.get("db"));
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.json({ message: "User signed in successfully", user });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const db = req.app.get("db");
    console.log("Form Data Received:", req.body); // Log the form data
    // Check if user exists and old password is correct
    const user = await userModel.getUserByUsername(username, db);
    if (!user || user.password !== oldPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Update the password for the user
    console.log(username + " " + newPassword);
    await userModel.updatePassword(username, newPassword, db);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
