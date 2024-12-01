const db = require("../config/db");
const { hashPassword } = require("../middleware/authenticationRoute");

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
    const sql = `INSERT INTO student (student_id, student_name, student_birth, student_email, student_phone, student_address, student_url, student_descript)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    db.query(
      sql,
      [
        studentData.student_id,
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
          return callback(err);
        }
        db.query(
          "SELECT LAST_INSERT_ID() AS latest_student_id;",
          (err, result) => {
            if (err) {
              return callback(err);
            }
            var id = result[0].latest_student_id;
            console.log("[StudentCreate] password doesnt hashed:", studentData.student_password);
            var hasedPassword = hashPassword(studentData.student_password);
         
            hasedPassword.then((result) => {
                console.log("[StudentCreate] hasedPassword", result);
                var password=result;
                db.query(
                  `INSERT INTO student_account (student_id, student_username, student_password) VALUES (?, ?, ?);`,
                  [id, studentData.student_email, password],
                  (err, result) => {
                    if (err) {
                      return callback(err);
                    }
                    db.query(" SELECT * FROM student_account WHERE student_id = ?;",
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
            console.log("[TutorCreate] password doesnt hashed:", tutorData.tutor_password);
            var hasedPassword = hashPassword(tutorData.tutor_password);
         
            hasedPassword.then((result) => {
                console.log("[TutorCreate] hasedPassword", result);
                var password=result;
                db.query(
                  `INSERT INTO tutor_account (tutor_id, tutor_username, tutor_password) VALUES (?, ?, ?);`,
                  [id, tutorData.tutor_email, password],
                  (err, result) => {
                    if (err) {
                      return callback(err);
                    }
                    db.query(" SELECT * FROM tutor_account WHERE tutor_id = ?;",
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
module.exports = {
  StudentAccountCreate,
  TutorAccountCreate,
  TutorCreate,
  StudentCreate,
  AdmissionList,
  signInAdmission,
  getAdmissionInfo,
  updateAdmissionInfo,
};
