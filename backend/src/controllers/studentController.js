//Get all students place
const db = require("../config/db");
const {
  StudentCreate,
  StudentList,
  signInStudent,
  validatePassword,
  getStudentInfo,
  updateStudentInfo,
  getStudentClass,
  getStudentLessonClass,
  getStudentClassDetail,
  getStudentLessonDetail,
} = require("../models/studentModel");

const {
  createTokenStudent,
  verifyToken,
  hashPassword,
  comparePasswords,
} = require("../middleware/authenticationRoute");

// const getAllStudents = async (req, res) => {
//   try {

//     StudentList.getAll((err, result) => {
//       if (err) {
//         return res.status(404).send({
//           success: false,
//           message: "No data found",
//         });
//       }
//       console.log("Query succesfully executed", result);

//       return res.status(200).send({
//         success: true,
//         message: "Students retrieved successfully",
//         data: result,
//       });
//     });

//     db.end(function () {
//       console.log("Connection closed");
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       success: false,
//       message: "Internal server error",
//       error: err.message,
//     });
//   }
// };

const studentSignIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const studentAccount = await signInStudent(username);

    if (!studentAccount) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await comparePasswords(
      password,
      studentAccount.student_password
    );
    console.log("[studentController] Is pass match" + isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const student = getStudentInfo(studentAccount.student_id);

    student.then((result) => {
      res.status(200).json({
        token: createTokenStudent(result),
        message: "Login successful",
        user: result,
      });
    });
  } catch (err) {
    console.log("[StudentController]" + err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const studentUpdate = (req, res) => {
  const studentInfo = req.body;

  // Validate the student information
  const validationResult = validateStudentInfo(studentInfo);

  if (!validationResult.isValid) {
    // If validation fails, send a 400 Bad Request response
    return res.status(400).json({
      success: false,
      errors: validationResult.errors,
    });
  }

  try {
    // Update the student information in the database
    updateStudentInfo(studentInfo.student_id, studentInfo);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "[studentController]Internal server error",
      error: err.message,
    });
  }
  return res.status(200).json({
    success: true,
    message: "[studentController]Student information updated successfully",
  });
};

const studentGetInfo = (req, res) => {
  console.log("[StudentController]Getting student info", req.params.id);
  const studentData = getStudentInfo(req.params.id);
  studentData.then((result) => {
    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student found", student: result });
  });
};

function validateStudentInfo(studentInfo) {
  const errors = [];

  // Validate student_id
  if (!studentInfo.student_id || typeof studentInfo.student_id !== "string") {
    errors.push("Invalid student_id: Must be a non-empty string.");
  }

  // Validate student_name
  if (
    !studentInfo.student_name ||
    typeof studentInfo.student_name !== "string"
  ) {
    errors.push("Invalid student_name: Must be a non-empty string.");
  }

  // Validate student_birth (must be a valid date)
  if (
    !studentInfo.student_birth ||
    isNaN(Date.parse(studentInfo.student_birth))
  ) {
    errors.push("Invalid student_birth: Must be a valid date.");
  }

  // Validate student_email (basic email pattern check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !studentInfo.student_email ||
    !emailRegex.test(studentInfo.student_email)
  ) {
    errors.push("Invalid student_email: Must be a valid email address.");
  }

  // Validate student_phone (must be a valid phone number)
  const phoneRegex = /^\d{10,15}$/; // Accepts 10-15 digits
  if (
    !studentInfo.student_phone ||
    !phoneRegex.test(studentInfo.student_phone)
  ) {
    errors.push("Invalid student_phone: Must be 10-15 digits.");
  }

  // Validate student_address
  if (
    !studentInfo.student_address ||
    typeof studentInfo.student_address !== "string"
  ) {
    errors.push("Invalid student_address: Must be a non-empty string.");
  }

  // Validate student_url (if provided, must be a valid URL)
  if (studentInfo.student_url) {
    try {
      new URL(studentInfo.student_url); // Throws an error if invalid
    } catch {
      errors.push("Invalid student_url: Must be a valid URL.");
    }
  }

  // Validate student_descript
  if (
    !studentInfo.student_descript ||
    typeof studentInfo.student_descript !== "string"
  ) {
    errors.push("Invalid student_descript: Must be a non-empty string.");
  }

  // Return validation results
  if (errors.length > 0) {
    return {
      isValid: false,
      errors: errors,
    };
  }

  return {
    isValid: true,
    message: "Student information is valid.",
  };
}

const studentGetClass = (req, res) => {
  console.log("[StudentController]Getting student class", req.params.id);
  const classesData = getStudentClass(req.params.id);
  classesData.then((result) => {
    if (!result) {
      return res
        .status(404)
        .json({ message: "[studentControlled]Student not found" });
    }
    res
      .status(200)
      .json({ message: "[studentControlled]Class found", class: result });
  });
};

const studentGetLessonClass = (req, res) => {
  console.log(
    "[StudentController]Getting student lesson class",
    req.params.class_id
  );
  const classesData = getStudentLessonClass(req.params.class_id);
  classesData.then((result) => {
    if (!result) {
      return res
        .status(404)
        .json({ message: "[studentControlled]Student not found" });
    }
    res
      .status(200)
      .json({ message: "[studentControlled]Result found", class: result });
  });
};

const studentGetClassDetail = (req, res) => {
  console.log(
    "[StudentController]Getting student class detail",
    req.params.class_id
  );
  const classesData = getStudentClassDetail(req.params.class_id);
  classesData.then((result) => {
    if (!result) {
      return res
        .status(404)
        .json({ message: "[studentControlled]Student not found" });
    }
    res
      .status(200)
      .json({ message: "[studentControlled]Result found", class: result });
  });
};

const studentGetLessonDetail = (req, res) => {
  console.log(
    "[StudentController]Getting student lesson detail",
    req.params.lesson_id
  );
  const classesData = getStudentLessonDetail(req.params.lesson_id);
  classesData.then((result) => {
    if (!result) {
      return res
        .status(404)
        .json({ message: "[studentControlled]Student not found" });
    }
    res
      .status(200)
      .json({ message: "[studentControlled]Result found", lesson: result });
  });
};

module.exports = {
  // getAllStudents,
  // createStudent,
  studentSignIn,
  studentUpdate,
  studentUpdate,
  studentGetInfo,
  studentGetClass,
  studentGetLessonClass,
  studentGetClassDetail,
  studentGetLessonDetail,
};
