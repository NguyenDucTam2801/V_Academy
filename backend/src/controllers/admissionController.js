const db = require("../config/db");
const {
  addClass,
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
  addClass,
  getCourse,
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
  const admission_id = req.params.id;
  try {
    updateAdmissionInfo(admission_id, admissionInfo);
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
  const studentData = req.body;

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
  const tutorData = req.body;

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
  const tutorInfo = TutorAccountCreate.create(
    tutorAccountData,
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to create tutor account", details: err });
      }
      // return res.status(201).json({ message: 'Tutor account created successfully', result });
    }
  );
  return res
    .status(201)
    .json({ message: "Tutor account created successfully", tutorInfo });
};
//Create Student Account
const createStudentAccount = (req, res) => {
  const studentAccountData = req.body;
  StudentAccountCreate.create(studentAccountData, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to create student account", details: err });
    }
    return res
      .status(201)
      .json({ message: "Student account created successfully", result });
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
//create class
const createClass = async (req, res) => {
  const classData = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!classData.class_name || !classData.course_id || !classData.tutor_id || !classData.student_id || !classData.admission_id) {
    return res.status(400).send({
      success: false,
      message: "All fields are required: class_name, course_id, tutor_id, student_id, admission_id",
    });
  }

  // Call the model's addClass method
  addClass.create(classData, (err, result) => {
    try {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Error creating class",
          error: err,
        });
      }
      return res.status(201).send({
        success: true,
        message: "Class created successfully and linked to tutor and student!",
        data: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  });
};

//getCourse
const getCourseById = (req, res) => {
  const courseId = req.params.courseId;  // Lấy course_id từ URL parameters

  // Kiểm tra nếu courseId không được cung cấp
  if (!courseId) {
    return res.status(400).send({
      success: false,
      message: "Course ID is required",
    });
  }

  // Call the model's getCourse method
  getCourse.create(courseId, (err, result) => {
    try {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Error fetching course details",
          error: err,
        });
      }
      if (result.length === 0) {
        return res.status(404).send({
          success: false,
          message: "Course not found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Course details fetched successfully",
        data: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  });
};
module.exports = {
  getCourseById,
  createClass,
  createStudentAccount,
  createTutorAccount,
  createTutor,
  createStudent,
  admissionSignIn,
  admissionUpdate,
  admissionGetInfo,
  updateAdmissionInfo,
};
