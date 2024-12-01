const db = require("../config/db");
const { studentUpdate } = require("../controllers/studentController");

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
    const sql = `UPDATE student SET student_name = ?, student_birth = ?, student_email = ?, student_phone = ?, student_address = ?, student_url = ?, student_descript = ? WHERE student_id = ?`;
    console.log(
      "[StudentModel]Updating student info",
      JSON.stringify(studentData)
    );
    db.query(
      sql,
      [
        studentData.student_name,
        studentData.student_birth,
        studentData.student_email,
        studentData.student_phone,
        studentData.student_address,
        studentData.student_url || null,
        studentData.student_descript,
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
    const sql = "SELECT * FROM class WHERE student_id =?";
    console.log("[StudentModel]Getting student class", student_id);
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
      return resolve(result[0]);
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
      return resolve(result[0]);
    });
  });
}

module.exports = {
  StudentList,
  signInStudent,
  validatePassword,
  getStudentInfo,
  updateStudentInfo,
  getStudentClass,
  getStudentLessonClass,
  getStudentClassDetail,
  getStudentLessonDetail
};
