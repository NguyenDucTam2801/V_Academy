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

module.exports = {
  AdmissionCreate,
  AdmissionList,
  signInAdmission,
  getAdmissionInfo,
  updateAdmissionInfo,
};
