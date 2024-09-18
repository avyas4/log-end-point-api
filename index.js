const fs = require("fs");
const express = require("express");

var dataLog = fs.readFileSync("./programming-task-example-data.log", "utf8");
const api = express();

// Define constant for your end point
const HOST = "localhost";
const PORT = 8888;
const arrayOfObject = [];

const getData = dataLog.split("\n");

// Add a for loop to split array strings and store in array of object
for (var item = 0; item < getData.length - 1; item++) {
  let objectLog = {};
  objectLog["ip_address"] = getData[item].split(" - ")[0];
  objectLog["url"] = getData[item].split("GET ")[1]?.split(" HTTP")[0];
  arrayOfObject.push(objectLog);
}

api.get("/log", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.status(200).json(arrayOfObject);
});

api.listen(PORT, () => {
    // Display the information
  console.info(arrayOfObject);
  console.info(`API running at ${HOST}:${PORT}!`);
});
