var mysql = require("mysql");
const dotenv = require("dotenv").config();

var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect(function (err) {
  if (err) {
    console.log("DB "+err.code);
    console.log("DB "+err.fatal);
    return;
  } 

  console.log("DB Connected!");
});

// $query = "SELECT * FROM student";

// connection.query($query, function (err, rows, fields) {
//   if (err) {
//     console.log("An error ocurred performing the query.");
//     return;
//   }

//   console.log("Query succesfully executed", rows);
// });

// connection.end(function () {
//   console.log("Connection closed");
// });

module.exports = db;