const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Open the database connection
const openDatabase = async () => {
  try {
    const db = await open({
      filename: "./db/database.db",
      driver: sqlite3.Database,
    });
    console.log("Connected to the database");
    return db;
  } catch (error) {
    console.error("Error opening database:", error.message);
    throw error;
  }
};

module.exports = { openDatabase };
