const db = require("../config/db");

// Student model with a method to create a new student

const StudentCreate = {
    create: (studentData, callback) => {
        const sql = `INSERT INTO student (student_id, student_name, student_birth, student_email, student_phone, student_address, student_url, student_descript)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [
            studentData.student_id,
            studentData.student_name,
            studentData.student_birth,
            studentData.student_email,
            studentData.student_phone,
            studentData.student_address,
            studentData.student_url || null,
            studentData.student_descript
        ], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
    }
};

const StudentList = {
    getAll: (callback) => {
        const sql = `SELECT * FROM student`;
        db.query(sql, [], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        });
        db.end(function () {
            console.log("Connection closed");
          });
    }
}

module.exports = {StudentCreate, StudentList};