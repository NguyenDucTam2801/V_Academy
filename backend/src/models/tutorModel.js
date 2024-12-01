const db = require("../config/db");

// Tutor model with methods to handle tutor-related queries

const signInTutor = (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tutor_account WHERE tutor_userName = ?";
    db.query(sql, [username], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Tutor not found"));
      }
      return resolve(result[0]);
    });
  });
};


const TutorList = {
  getAll: (callback) => {
    const sql = `SELECT * FROM tutor`;
    db.query(sql, [], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
    db.end(() => {
      console.log("[TutorModel]Connection closed");
    });
  },
};

const getTutorInfo = (tutor_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tutor WHERE tutor_id = ?";
    db.query(sql, [tutor_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Tutor not found"));
      }
      return resolve(result[0]);
    });
  });
};
const validatePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword); // Returns a boolean
  };
const updateTutorInfo = (tutor_id, tutorData) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE tutor SET tutor_name = ?, tutor_email = ?, tutor_phone = ?, tutor_address = ?, tutor_url = ?, tutor_specialty = ?, tutor_description = ? WHERE tutor_id = ?`;
    db.query(
      sql,
      [
        tutorData.tutor_name,
        tutorData.tutor_email,
        tutorData.tutor_phone,
        tutorData.tutor_address,
        tutorData.tutor_url || null,
        tutorData.tutor_specialty,
        tutorData.tutor_description,
        tutor_id,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
const addLesson = (lessonData) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO `lesson` ( `lesson_topic`, `lesson_descript`, `lesson_note`, `lesson_url`, `lesson_startTime`) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        lessonData.lesson_topic,
        lessonData.lesson_descript,
        lessonData.lesson_note || null,  // Optional fields, if no value is provided, null is used
        lessonData.lesson_url || null,   // Optional fields, if no value is provided, null is used
        lessonData.lesson_startTime,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

const getNewestLesson = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM lesson
      ORDER BY lesson_id DESC
      LIMIT 1
    `;
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);  // Reject if there's a database error
      }
      // If no lessons are found, resolve with null
      if (result.length === 0) {
        return resolve(null);
      }
      // Otherwise, resolve with the newest lesson
      return resolve(result[0]);
    });
  });
};
const addLessonToClass = (classId, lessonId) => {
  return new Promise((resolve, reject) => {
    // SQL query to insert a record into the class_lesson table
    const sql = `
      INSERT INTO class_lesson (class_id, lesson_id) 
      VALUES (?, ?)
    `;
    // Execute the query
    db.query(sql, [classId, lessonId], (err, result) => {
      if (err) {
        // Reject promise if there's an error with the query
        return reject(err);
      }
      // Resolve with the result if the insert is successful
      return resolve(result);
    });
  });
};
const getTutorClass = (tutor_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM class WHERE tutor_id =?";
    console.log("[TutorModel] Getting tutor's class", tutor_id);
    db.query(sql, [tutor_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Tutor's class not found"));
      }
      return resolve(result); // Return all classes the tutor is teaching
    });
  });
};

const getTutorLessonClass = (class_id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM `lesson` LEFT JOIN class_lesson ON class_lesson.lesson_id = lesson.lesson_id WHERE class_lesson.class_id = ?";
    console.log("[TutorModel] Getting tutor's lesson for class", class_id);
    db.query(sql, [class_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("No lessons found for this class"));
      }
      return resolve(result); // Return lessons in the specified class
    });
  });
};

const getTutorClassDetail = (class_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM class WHERE class_id = ?";
    console.log("[TutorModel] Getting class detail for tutor", class_id);
    db.query(sql, [class_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Class not found"));
      }
      return resolve(result[0]);
    });
  });
};

const getTutorLessonDetail = (lesson_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM lesson WHERE lesson_id = ?";
    console.log("[TutorModel] Getting lesson detail for tutor", lesson_id);
    db.query(sql, [lesson_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Lesson not found"));
      }
      return resolve(result[0]); // Return details of the specific lesson
    });
  });
};

module.exports = {
  getTutorLessonDetail,
  getTutorClassDetail,
  getTutorClass,
  getTutorLessonClass,
  addLessonToClass,
  addLesson,
  getNewestLesson,
  TutorList,
  signInTutor,
  getTutorInfo,
  updateTutorInfo,
};
