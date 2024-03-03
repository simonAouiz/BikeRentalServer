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
