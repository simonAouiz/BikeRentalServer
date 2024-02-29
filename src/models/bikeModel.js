exports.createBike = async (
  { image: imagePath, description, city, dateStart, dateEnd, price },
  db
) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO bikes (image, description, city, dateStart, dateEnd, price) VALUES (?, ?, ?, ?, ?, ?)",
      [imagePath, description, city, dateStart, dateEnd, price],
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
          });
        }
      }
    );
  });
};
