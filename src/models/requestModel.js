exports.createRequest = async ({ username, bikeId }, db) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO requests (requester, bikeID) VALUES (?, ?)",
      [username, bikeId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            username,
            bikeId,
          });
        }
      }
    );
  });
};

exports.getRequestsByBike = async ({ bikeID }, db) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM requests WHERE bikeId = ?",
      [bikeID],
      function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

exports.getRequestsByRequester = async ({ username }, db) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM requests WHERE requester = ?",
      [username],
      function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

exports.updateRequestStatus = async ({ requestID, status }, db) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE requests SET status = ? WHERE id = ?`,
      [status, requestID],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      }
    );
  });
};

exports.deleteRequest = async (requestID, db) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM requests WHERE id = ?`, [requestID], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};
