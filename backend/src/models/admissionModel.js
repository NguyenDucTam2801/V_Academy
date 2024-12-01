const db = require("../config/db");

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

const AdmissionCreate = {
  create: (admissionData, callback) => {
    const sql = `INSERT INTO admission (admission_id, admission_name, admission_email, admission_phone, admission_address, admission_department)
                         VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        admissionData.admission_id,
        admissionData.admission_name,
        admissionData.admission_email,
        admissionData.admission_phone,
        admissionData.admission_address,
        admissionData.admission_department,
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
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM admission WHERE admission_id = ?";
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
  return new Promise((resolve, reject) => {
    const sql = `UPDATE admission SET admission_name = ?, admission_email = ?, admission_phone = ?, admission_address = ?, admission_department = ? WHERE admission_id = ?`;
    db.query(
      sql,
      [
        admissionData.admission_name,
        admissionData.admission_email,
        admissionData.admission_phone,
        admissionData.admission_address,
        admissionData.admission_department,
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
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
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
        return callback(null, result);
      }
    );
  },
};

//Create Tutor
const TutorCreate = {
  create: (tutorData, callback) => {
    const sql = `INSERT INTO tutor (tutor_id, tutor_name, tutor_email, tutor_phone, tutor_address, tutor_url, tutor_specialty, tutor_description)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        tutorData.tutor_id,
        tutorData.tutor_name,
        tutorData.tutor_email,
        tutorData.tutor_phone,
        tutorData.tutor_address,
        tutorData.tutor_url || null,
        tutorData.tutor_specialty,
        tutorData.tutor_description,
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

//Create Tutor account
const TutorAccountCreate = {
  create: (tutorAccountData, callback) => {
    const sql = `INSERT INTO tutor_account (tutor_id,tutor_username.tutor_password)
                         VALUES (?, ?, ?,`;
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
                         VALUES (?, ?, ?,`;
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
  AdmissionCreate,
  AdmissionList,
  signInAdmission,
  getAdmissionInfo,
  updateAdmissionInfo,
};
