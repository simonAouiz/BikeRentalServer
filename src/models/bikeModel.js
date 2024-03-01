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
