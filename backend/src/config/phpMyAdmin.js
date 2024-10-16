var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    root: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect(function(err) {
    if (err){
        console.log(err.code);
        console.log(err.fatal);
        return
    };

    console.log("Connected!");
})

$query = 'SELECT * FROM student';

connection.query($query, function(err, rows, fields) {
    if (err) {
        console.log("An error ocurred performing the query.");
        return;
    }

    console.log("Query succesfully executed", rows);
});

connection.end(function(){
    console.log("Connection closed");
});
