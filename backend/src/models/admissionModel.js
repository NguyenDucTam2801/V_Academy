const db = require("../config/db");
const authenticationRoute = require("../middleware/authenticationRoute");

// Admission model with methods to handle admission-related queries

const signInAdmission = (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM admission_account WHERE admission_userName = ?";
    db.query(sql, [username], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Admission officer not found"));
      }
      return resolve(result[0]);
    });
  });
};

//addmision List
const AdmissionList = {
  getAll: (callback) => {
    const sql = `SELECT * FROM admission`;
    db.query(sql, [], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
    db.end(() => {
      console.log("[AdmissionModel]Connection closed");
    });
  },
};
//get addmision List
const getAdmissionInfo = (admission_id) => {
  console.log("[admissionModel] getAdmissionInfo admission_id:", admission_id);
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM `admission` WHERE `admission_id` = ?";
    db.query(sql, [admission_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Admission officer not found"));
      }
      return resolve(result[0]);
    });
  });
};
const validatePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword); // Returns a boolean
};
const updateAdmissionInfo = (admission_id, admissionData) => {
  console.log(
    "[admissionModel] updateAdmissionInfo admission_id:",
    admission_id
  );
  console.log(
    "[admissionModel] updateAdmissionInfo admissionData:",
    admissionData
  );
  return new Promise((resolve, reject) => {
    const sql = `UPDATE admission SET admission_name = ?,admission_birth=?, admission_email = ?, admission_phone = ?, admission_address = ?, admission_url= ?, admission_region=?  WHERE admission_id = ?`;
    db.query(
      sql,
      [
        admissionData.admission_name,
        admissionData.admission_birth,
        admissionData.admission_email,
        admissionData.admission_phone,
        admissionData.admission_address,
        admissionData.admission_url || null,
        admissionData.admisison_region,
        admission_id,
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
//Create Student
const StudentCreate = {
  create: (studentData, callback) => {
    console.log("[AdmissionModel]studentData ", studentData);
    const sql = `INSERT INTO student (student_name, student_birth, student_email, student_phone, student_address, student_url, student_descript)
                         VALUES ( ?, ?, ?, ?, ?, ?, ?);`;
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
      ],
      (err, result) => {
        if (err) {
          console.log("[AdmissionModel]err " + err);
          return callback(err);
        }
        db.query(
          "SELECT LAST_INSERT_ID() AS latest_student_id;",
          (err, result) => {
            if (err) {
              return callback(err);
            }
            var id = result[0].latest_student_id;
            console.log(
              "[StudentCreate] password doesnt hashed:",
              studentData.student_password
            );
            var hasedPassword = hashPassword(studentData.student_password);

            hasedPassword.then((result) => {
              console.log("[StudentCreate] hasedPassword", result);
              var password = result;
              db.query(
                `INSERT INTO student_account (student_id, student_username, student_password) VALUES (?, ?, ?);`,
                [id, studentData.student_email, password],
                (err, result) => {
                  if (err) {
                    return callback(err);
                  }
                  db.query(
                    " SELECT * FROM student_account WHERE student_id = ?;",
                    [id],
                    (err, result) => {
                      if (err) {
                        return callback(err);
                      }
                      return callback(null, result);
                    }
                  );
                }
              );
            });
          }
        );
      }
    );
  },
};

//Create Tutor
const TutorCreate = {
  create: (tutorData, callback) => {
    console.log("[tutorModel] tutorData:", tutorData);
    const sql =
      "INSERT INTO `tutor` ( `tutor_name`, `tutor_birth`, `tutor_email`, `tutor_phone`, `tutor_region`, `tutor_address`, `tutor_url`, `tutor_descript`, `subject_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      sql,
      [
        tutorData.tutor_name,
        tutorData.tutor_birth,
        tutorData.tutor_email,
        tutorData.tutor_phone,
        tutorData.tutor_region,
        tutorData.tutor_address,
        tutorData.tutor_url || null,
        tutorData.tutor_descript,
        tutorData.subject_id,
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        db.query(
          "SELECT LAST_INSERT_ID() AS latest_tutor_id;",
          (err, result) => {
            if (err) {
              return callback(err);
            }
            var id = result[0].latest_tutor_id;
            console.log(
              "[TutorCreate] password doesnt hashed:",
              tutorData.tutor_password
            );
            var hasedPassword = hashPassword(tutorData.tutor_password);

            hasedPassword.then((result) => {
              console.log("[TutorCreate] hasedPassword", result);
              var password = result;
              db.query(
                `INSERT INTO tutor_account (tutor_id, tutor_username, tutor_password) VALUES (?, ?, ?);`,
                [id, tutorData.tutor_email, password],
                (err, result) => {
                  if (err) {
                    return callback(err);
                  }
                  db.query(
                    " SELECT * FROM tutor_account WHERE tutor_id = ?;",
                    [id],
                    (err, result) => {
                      if (err) {
                        return callback(err);
                      }
                      return callback(null, result);
                    }
                  );
                }
              );
            });
          }
        );
      }
    );
  },
};

//Create Tutor account
const TutorAccountCreate = {
  create: (tutorAccountData, callback) => {
    const sql = `INSERT INTO tutor_account (tutor_id,tutor_username.tutor_password)
                         VALUES (?, ?, ?)`;
    db.query(
      sql,
      [
        tutorAccountData.tutor_id,
        tutorAccountData.tutor_username,
        tutorAccountData.tutor_password,
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};

//Create Student Account
const StudentAccountCreate = {
  create: (studentAccountData, callback) => {
    const sql = `INSERT INTO tutor_account (tutor_id,tutor_username.tutor_password)
                         VALUES (?, ?, ?)`;
    db.query(
      sql,
      [
        studentAccountData.student_id,
        studentAccountData.student_userName,
        studentAccountData.student_password,
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
const addClass = {
  create: (classData, callback) => {
    const sql = `INSERT INTO class (class_name, class_descript, course_id, tutor_id, student_id, admission_id)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    console.log("[addClass] classData:", classData);

    // Insert class into database
    db.query(
      sql,
      [
        classData.class_name,
        classData.class_descript,
        classData.course_id,
        classData.tutor_id,
        classData.student_id,
        classData.admission_id,
      ],
      (err, result) => {
        if (err) {
          console.error("[addClass] Error inserting class:", err);
          return callback(err);
        }

        console.log("[addClass] Successfully added class:", result);

        // Fetch the class based on the admission ID
        const fetchSql = "SELECT * FROM `class` WHERE `admission_id` = ?";
        db.query(
          fetchSql,
          [classData.admission_id],
          (fetchErr, fetchResult) => {
            if (fetchErr) {
              console.error("[addClass] Error fetching class:", fetchErr);
              return callback(fetchErr);
            }

            console.log("[addClass] Retrieved class:", fetchResult);
            return callback(null, fetchResult);
          }
        );
      }
    );
  },
};

//getCourse
const getCourse = {
  get: (callback) => {
    const sql = `SELECT * FROM course`;

    // Thực hiện query để lấy dữ liệu khóa học từ database
    db.query(sql, (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result); // Trả về dữ liệu khóa học
    });
  },
  // SQL query to select a course by its course_id
};

const getStudents = (callback) => {
  var sql = "SELECT * FROM `student`";
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
};

const getTutors = (callback) => {
  var sql = "SELECT * FROM `tutor`";
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
};

const getClasses = (admission_id, callback) => {
  console.log("[admissionModel] getClasses admission_id:", admission_id);
  var sql = "SELECT * FROM `class` WHERE `admission_id` = ?";
  db.query(sql, admission_id, (err, result) => {
    if (err) {
      return callback(err);
    }
    console.log("[admissionModel] getClasses result:", result);
    return callback(null, result);
  });
};

const getCustomerContacts = (callback) => {
  var sql = "SELECT * FROM `customer_contact`";
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
};

const changeCustomerContactStatus = (customer_id, status, callback) => {
  const updateSql = `
    UPDATE customer_contact 
    SET customer_status = ? 
    WHERE customer_id = ?`;

  const fetchSql = `
    SELECT * 
    FROM customer_contact 
    WHERE customer_id = ?`;

  db.query(updateSql, [status, customer_id], (updateErr, updateResult) => {
    if (updateErr) {
      console.error("[changeCustomerContactStatus] Update Error:", updateErr);
      return callback(updateErr);
    }

    console.log("[changeCustomerContactStatus] Update Result:", updateResult);

    if (updateResult.affectedRows === 0) {
      return callback(
        new Error("No rows updated. Check if the customer_id exists.")
      );
    }

    // Fetch updated customer data
    db.query(fetchSql, [customer_id], (fetchErr, fetchResult) => {
      if (fetchErr) {
        console.error("[changeCustomerContactStatus] Fetch Error:", fetchErr);
        return callback(fetchErr);
      }

      console.log("[changeCustomerContactStatus] Fetched Data:", fetchResult);
      return callback(null, fetchResult);
    });
  });
};

const getClassDetailAdmission = (class_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM `class` WHERE `class_id` = ?";
    db.query(sql, [class_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Class not found"));
      }
      console.log("[admissionModel] getClassDetailAdmission result:", result);
      return resolve(result[0]);
    });
  });
};

const getLessonDetailAdmission = (lesson_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM `lesson` WHERE `lesson_id` = ?";
    db.query(sql, [lesson_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return reject(new Error("Lesson not found"));
      }
      return resolve(result[0]);
    });
  });
};

const getLessonClassAdmission = (class_id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM `lesson` left join class_lesson on class_lesson.lesson_id = lesson.lesson_id where class_lesson.class_id=?;";
    db.query(sql, [class_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      console.log("[admissionModel] getLessonClassAdmission result:", result);
      return resolve(result);
    });
  });
};
const getSubjectAdminstration = (callback) => {
  var sql = "SELECT * FROM `subject`";
  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
};

const deleteCustomer = (customer_id, callback) => {
  const sql =
    "DELETE FROM customer_contact WHERE `customer_contact`.`customer_id` = ?";
  db.query(sql, [customer_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    console.log("[Admission Model] Delete customer" + result);
    return callback(null, result);
  });
};

const getCurrentPassword = (user_id, callback) => {
  console.log("[Admission Model]User Id" + user_id);
  const sql = "SELECT * FROM `admission_account` WHERE `admission_id` = ?";
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    console.log("[Admission Model] Result get current password" + result);
    return callback(null, result);
  });
};

const changeNewPassword = (new_password, user_id, callback) => {
  const sql =
    "UPDATE `admission_account` SET `admission_password` = ? WHERE `admission_account`.`admission_id` = ?";
  const hashedPassword = authenticationRoute.hashPassword(new_password);
  hashedPassword.then((result) => {
    console.log("hashed password", result);
    db.query(sql, [result, user_id], (err, result) => {
      if (err) {
        console.log("error", err)
        return callback(err);
      }
      console.log("[Admission Model] Result change password", result);
      return callback(null, result);
    });
  });
};

const getTutorWithSubjectModel = (subject_id, callback) => {
  const sql = "SELECT * FROM `tutor` WHERE `subject_id` LIKE ?";
  db.query(sql, [subject_id], (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
}

module.exports = {
  getCourse,
  addClass,
  StudentAccountCreate,
  TutorAccountCreate,
  TutorCreate,
  StudentCreate,
  AdmissionList,
  signInAdmission,
  getAdmissionInfo,
  updateAdmissionInfo,
  getStudents,
  getTutors,
  getClasses,
  getCustomerContacts,
  changeCustomerContactStatus,
  getClassDetailAdmission,
  getLessonDetailAdmission,
  getLessonClassAdmission,
  getSubjectAdminstration,
  deleteCustomer,
  getCurrentPassword,
  changeNewPassword,
  getTutorWithSubjectModel
};
