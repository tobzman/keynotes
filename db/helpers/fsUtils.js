const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "db", "db.json");

// Utility function to read data from the db.json file
const readDataFromFile = (callback) => {
  fs.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    const jsonData = JSON.parse(data);
    callback(null, jsonData);
  });
};

// Utility function to write data to the db.json file
const writeDataToFile = (data, callback) => {
  fs.writeFile(dbFilePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    }
    callback(null, true);
  });
};

module.exports = {
  readDataFromFile,
  writeDataToFile,
};
