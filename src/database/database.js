const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./db/database.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

module.exports = { db };
