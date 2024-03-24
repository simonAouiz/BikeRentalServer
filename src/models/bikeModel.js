exports.createBike = async (
  { image: imagePath, description, city, dateStart, dateEnd, price, username },
  db
) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO bikes (image, description, city, dateStart, dateEnd, price, uploader) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [imagePath, description, city, dateStart, dateEnd, price, username],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            image: imagePath,
            description,
            city,
            dateStart,
            dateEnd,
            price,
            username,
          });
        }
      }
    );
  });
};

exports.getBikeByID = async (id, db) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM bikes WHERE id = ?", [id], function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.getBikesByUser = async ({ username }, db) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM bikes WHERE uploader = ?",
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

exports.getBikesFilteredFromDB = async ({ city, dateStart, dateEnd }, db) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM bikes WHERE 1=1";
    const params = [];

    if (city) {
      sql += " AND city = ?";
      params.push(city);
    }
    if (dateStart) {
      sql += " AND dateStart >= ?";
      params.push(dateStart);
    }
    if (dateEnd) {
      sql += " AND dateEnd <= ?";
      params.push(dateEnd);
    }

    db.all(sql, params, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.editBike = async (
  { image: imagePath, description, city, dateStart, dateEnd, price, id },
  db
) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE bikes SET image = ?, description = ?, city = ?, dateStart = ?, dateEnd = ?, price = ? WHERE id = ?",
      [imagePath, description, city, dateStart, dateEnd, price, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            image: imagePath,
            description,
            city,
            dateStart,
            dateEnd,
            price,
            id,
          });
        }
      }
    );
  });
};

exports.editBikeWithoutImage = async (
  { description, city, dateStart, dateEnd, price, id },
  db
) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE bikes SET description = ?, city = ?, dateStart = ?, dateEnd = ?, price = ? WHERE id = ?",
      [description, city, dateStart, dateEnd, price, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            description,
            city,
            dateStart,
            dateEnd,
            price,
            id,
          });
        }
      }
    );
  });
};

exports.removeBike = async (id, db) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM bikes WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "Bike removed successfully" });
      }
    });
  });
};
