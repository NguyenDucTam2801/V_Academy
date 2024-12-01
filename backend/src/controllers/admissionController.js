const db = require("../config/db");
const {
  StudentAccountCreate,
  TutorAccountCreate,
  TutorCreate,
  StudentCreate,
  AdmissionCreate,
  AdmissionList,
  signInAdmission,
  validatePassword,
  getAdmissionInfo,
  updateAdmissionInfo,
  getAdmissionApplications,
  getAdmissionApplicationDetails,
} = require("../models/admissionModel");

const {
  createTokenAdmission,
  verifyToken,
  hashPassword,
  comparePasswords,
} = require("../middleware/authenticationRoute");

const admissionSignIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admissionAccount = await signInAdmission(username);

    if (!admissionAccount) {
      return res.status(404).json({ message: "Admission officer not found" });
    }
    const isPasswordMatch = await comparePasswords(
      password,
      admissionAccount.admission_password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const admission = getAdmissionInfo(admissionAccount.admission_id);

    admission.then((result) => {
      res.status(200).json({
        token: createTokenAdmission(result),
        message: "Login successful",
        admission: result,
      });
    });
  } catch (err) {
    console.error("[AdmissionController]", err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const admissionUpdate = (req, res) => {
  const admissionInfo = req.body;

  try {
    updateAdmissionInfo(admissionInfo.admission_id, admissionInfo);
    res.status(200).json({
      success: true,
      message: "Admission officer information updated successfully",
    });
  } catch (err) {
    console.error("[AdmissionController]", err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
//Create Student
const createStudent = async (req, res) => {
  const studentData = {
    student_id: req.body.student_id,
    student_name: req.body.student_name,
    student_birth: req.body.student_birth,
    student_email: req.body.student_email,
    student_phone: req.body.student_phone,
    student_address: req.body.student_address,
    student_url: req.body.student_url,
    student_descript: req.body.student_descript,
  };

  // Call the model's create method
  StudentCreate.create(studentData, (err, result) => {
    try {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Error creating student",
          error: err,
        });
      }
      return res.status(201).send({
        success: true,
        message: "Student created successfully!",
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  });
};
//Create Tutor
const createTutor = async (req, res) => {
  const tutorData = {
    tutor_id: req.body.tutor_id,
    tutor_name: req.body.tutor_name,
    tutor_birth: req.body.tutor_birth,
    tutor_email: req.body.tutor_email,
    tutor_phone: req.body.tutor_phone,
    tutor_region: req.body.tutor_region,
    tutor_address: req.body.tutor_address,
    tutor_url: req.body.tutor_url,
    tutor_descript: req.body.tutor_descript,
  };

  // Call the model's create method
  TutorCreate.create(tutorData, (err, result) => {
    try {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Error creating tutor",
          error: err,
        });
      }
      return res.status(201).send({
        success: true,
        message: "Tutor created successfully!",
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  });
};
////Create Tutor account
const createTutorAccount = (req, res) => {
  const tutorAccountData = req.body;
  TutorAccountCreate.create(tutorAccountData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create tutor account', details: err });
    }
    return res.status(201).json({ message: 'Tutor account created successfully', result });
  });
};
//Create Student Account
const createStudentAccount = (req, res) => {
  const studentAccountData = req.body;
  StudentAccountCreate.create(studentAccountData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create student account', details: err });
    }
    return res.status(201).json({ message: 'Student account created successfully', result });
  });
};
const admissionGetInfo = (req, res) => {
  const admissionData = getAdmissionInfo(req.params.id);
  admissionData.then((result) => {
    if (!result) {
      return res.status(404).json({ message: "Admission officer not found" });
    }
    res
      .status(200)
      .json({ message: "Admission officer found", admission: result });
  });
};

module.exports = {
  createStudentAccount,
  createTutorAccount,
  createTutor,
  createStudent,
  admissionSignIn,
  admissionUpdate,
  admissionGetInfo,
};
