var mysql = require("mysql");
const env = require("dotenv").config();

var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const mysqlUrl = `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;


db.connect(function (err) {
  if (err) {
    console.log("DB " + err.code);
    console.log("DB " + err.fatal);
    console.log("DB " + err);
    console.log("MySQL URL:", mysqlUrl); // Log the full connection URL

    return;
  }

  console.log("DB Connected!");
    console.log("MySQL URL:", mysqlUrl); // Log the full connection URL

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
