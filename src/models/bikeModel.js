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

exports.getBikesFromDB = async ({ username }, db) => {
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

exports.getBikesFilteredFromDB = async ({ city, startDate, endDate }, db) => {
  return new Promise((resolve, reject) => {
    // Construct the SQL query based on the provided filter parameters
    let sql = "SELECT * FROM bikes WHERE 1=1";
    const params = [];

    if (city) {
      sql += " AND city = ?";
      params.push(city);
    }
    if (startDate && endDate) {
      sql += " AND dateStart >= ? AND dateEnd <= ?";
      params.push(startDate, endDate);
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
