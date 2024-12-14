const db = require("../config/db");
const authenticationRoute = require("../middleware/authenticationRoute");

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
    const sql = `UPDATE tutor SET tutor_name = ?,tutor_birth=?, tutor_email = ?, tutor_phone = ?, tutor_region=?, tutor_address = ?, tutor_url = ?, tutor_descript = ? WHERE tutor_id = ?`;
    db.query(
      sql,
      [
        tutorData.tutor_name,
        tutorData.tutor_birth,
        tutorData.tutor_email,
        tutorData.tutor_phone,
        tutorData.tutor_address,
        tutorData.tutor_region,
        tutorData.tutor_url || null,
        tutorData.tutor_descript,
        tutor_id,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.affectedRows === 0) {
          console.log(
            "[TutorModel] Update executed successfully, but no rows were affected."
          );
          return resolve({
            success: false,
            message: "No rows were updated. Tutor ID may not exist.",
          });
        }
        console.log("[TutorModel] Tutor info updated", JSON.stringify(result));
        return resolve(result);
      }
    );
  });
};
const addLesson = (lessonData, class_id) => {
  return new Promise((resolve, reject) => {
    var sql =
      "INSERT INTO `lesson` ( `lesson_topic`, `lesson_descript`, `lesson_note`, `lesson_url`, `lesson_startTime`) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        lessonData.lesson_topic,
        lessonData.lesson_descript,
        lessonData.lesson_note || null, // Optional fields, if no value is provided, null is used
        lessonData.lesson_url || null, // Optional fields, if no value is provided, null is used
        lessonData.lesson_startTime,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        db.query(
          "SELECT LAST_INSERT_ID() as lastest_lesson_id",
          (err, result) => {
            if (err) {
              return reject(err);
            }
            var id = result[0].lastest_lesson_id;
            console.log("[TUtorModel] Lesson added", JSON.stringify(id));
            db.query(
              " INSERT INTO class_lesson (class_id, lesson_id) VALUES (?, ?)",
              [class_id, id],
              (err, result) => {
                if (err) {
                  return reject(err);
                }
                console.log(
                  "[TutorModel] Lesson added to class",
                  JSON.stringify(result)
                );
                db.query("SELECT * FROM `lesson` LEFT JOIN class_lesson ON class_lesson.lesson_id = lesson.lesson_id WHERE class_lesson.class_id = ?", [class_id], (err, result) => {
                  if (err) {
                    return reject(err);
                  }
                  if (result.length === 0) {
                    return reject(new Error("No lessons found for this class"));
                  }
                  return resolve(result); // Return lessons in the specified class
                });
              }
            );
          }
        );
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
        return reject(err); // Reject if there's a database error
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

const getCurrentPassword = (user_id, callback) => {
  console.log("[tutor Model]User Id" + user_id);
  const sql = "SELECT * FROM `tutor_account` WHERE `tutor_id` = ?";
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    console.log("[tutor Model] Result get current password" + result);
    return callback(null, result);
  });
};

const changeNewPassword = (new_password, user_id, callback) => {
  const sql =
    "UPDATE `tutor_account` SET `tutor_password` = ? WHERE `tutor_account`.`tutor_id` = ?";
  const hashedPassword = authenticationRoute.hashPassword(new_password);
  hashedPassword.then((result) => {
    console.log("hashed password", result);
    db.query(sql, [result, user_id], (err, result) => {
      if (err) {
        console.log("error", err)
        return callback(err);
      }
      console.log("[tutor Model] Result change password", result);
      return callback(null, result);
    });
  });
};

const changeLessonStatusModel = (lesson_id, lesson_status, callback) => {
  const sql = "UPDATE `lesson` SET `lesson_status` = ? WHERE `lesson_id` = ?";
  db.query(sql, [lesson_status,lesson_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
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
  getCurrentPassword,
  changeNewPassword,
  changeLessonStatusModel
};
