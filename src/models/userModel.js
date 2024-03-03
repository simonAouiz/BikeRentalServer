exports.getUserByUsernameOrEmail = async (username, email, db) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
};

exports.getUserByUsername = async (username, db) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

exports.createUser = async ({
  full_name,
  username,
  password,
  email,
  phoneNumber,
  db,
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (full_name, username, password, email, phoneNumber) VALUES (?, ?, ?, ?, ?)",
      [full_name, username, password, email, phoneNumber],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, full_name, username, email, phoneNumber });
        }
      }
    );
  });
};

exports.updatePassword = async (username, newPassword, db) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET password = ? WHERE username = ?",
      [newPassword, username],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
