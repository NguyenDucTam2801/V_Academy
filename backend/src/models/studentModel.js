const db = require("../config/db");
const authenticationRoute = require("../middleware/authenticationRoute");

// Student model with a method to create a new student

const signInStudent = (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM student_account WHERE student_userName = ?";
    db.query(sql, [username], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("User not found"));
      }
      return resolve(result[0]);
    });
  });
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
      console.log("[StudentModel]Connection closed");
    });
  },
};

const validatePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword); // Returns a boolean
};

const getStudentInfo = (student_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM student WHERE student_id = ?";
    console.log("[StudentModel]Getting student info", student_id);
    db.query(sql, [student_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Student not found"));
      }
      return resolve(result[0]);
    });
  });
};

const updateStudentInfo = (student_id, studentData) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE student SET student_name = ?, student_birth = ?,  student_phone = ?, student_address = ? WHERE student_id = ?`;
    console.log(
      "[StudentModel]Updating student info",
      JSON.stringify(studentData)
    );
    db.query(
      sql,
      [
        studentData.student_name,
        studentData.student_birth,
        studentData.student_phone,
        studentData.student_address,
        student_id,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log("[StudentModel]Updated student info", result);
        return resolve(result);
      }
    );
  });
};

const getStudentClass = (student_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM `class` WHERE `student_id` = ?";
    console.log("[StudentModel]Getting student class", student_id);
    db.query(sql, [student_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Student not found"));
      }
      console.log("[StudentModel]Student class", result);
      return resolve(result);
    });
  });
};

const getStudentLessonClass = (class_id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM `lesson` left join class_lesson on class_lesson.lesson_id = lesson.lesson_id where class_lesson.class_id=?;";
    console.log("[StudentModel]Getting student lesson class", class_id);
    db.query(sql, [class_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Student not found"));
      }
      console.log("[StudentModel]Student lesson class", result);
      return resolve(result);
    });
  });
};

const getStudentClassDetail = (class_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM class WHERE class_id =?";
    console.log("[StudentModel]Getting student class detail", class_id);
    db.query(sql, [class_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Student not found"));
      }
      console.log("[StudentModel]Student class detail", result);
      return resolve(result);
    });
  });
};

const getStudentLessonDetail = (lesson_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM lesson WHERE lesson_id =?";
    console.log("[StudentModel]Getting student lesson detail", lesson_id);
    db.query(sql, [lesson_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Student not found"));
      }
      console.log("[StudentModel]Student lesson detail", result);
      return resolve(result[0]);
    });
  });
};

const getCurrentPassword = (user_id, callback) => {
  console.log("[Student Model]User Id" + user_id);
  const sql = "SELECT * FROM `student_account` WHERE `student_id` = ?";
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    console.log("[Student Model] Result get current password" + result);
    return callback(null, result);
  });
};

const changeNewPassword = (new_password, user_id, callback) => {
  const sql =
    "UPDATE `student_account` SET `student_password` = ? WHERE `student_account`.`student_id` = ?";
  const hashedPassword = authenticationRoute.hashPassword(new_password);
  hashedPassword.then((result) => {
    console.log("hashed password", result);
    db.query(sql, [result, user_id], (err, result) => {
      if (err) {
        console.log("error", err);
        return callback(err);
      }
      console.log("[Student Model] Result change password", result);
      return callback(null, result);
    });
  });
};

module.exports = {
  StudentList,
  signInStudent,
  validatePassword,
  getStudentInfo,
  updateStudentInfo,
  getStudentClass,
  getStudentLessonClass,
  getStudentClassDetail,
  getStudentLessonDetail,
  getCurrentPassword,
  changeNewPassword,
};
