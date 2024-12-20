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
  getCurrentPassword,
  changeNewPassword,
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
  const student_id = req.params.id;
  console.log("[StudentController]Updating student info", student_id);
  console.log("[StudentController]Student info", studentInfo);
  // Validate the student information
  const validationResult = validateStudentInfo(studentInfo);
  console.log("[StudentController]Validation result", validationResult);

  if (!validationResult.isValid) {
    // If validation fails, send a 400 Bad Request response
    return res.status(400).json({
      success: false,
      errors: validationResult.errors,
    });
  }

  try {
    // Update the student information in the database
    updateStudentInfo(student_id, studentInfo);
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
    res.status(200).json({ message: "Student found", user: result });
  });
};

function validateStudentInfo(studentInfo) {
  const errors = [];
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
  
  // Return validation results
  if (errors.length > 0) {
    return {
      isValid: false,
      errors: errors,
    };
  }
  console.log("[StudentController]Student information is valid.");

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
  const classData = getStudentClassDetail(req.params.class_id);
  classData.then((result) => {
    console.log("[Student controller]Class detail result" + result);
    if (!result) {
      return res
        .status(404)
        .json({ message: "[studentControlled]Student not found" });
    }
    res
      .status(200)
      .json({ message: "[studentControlled]Result found", class:result  });
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

const changePasswordUser = (req, res) => {
  const id = req.params.id;
  const { current_password, new_password } = req.body;
  console.log("Id", id);
  console.log("current password", current_password);
  console.log("new password", new_password);
  if (!id || !current_password || !new_password) {
    return res.status(400).json({ message: "Invalid Input" });
  }
  getCurrentPassword(id, (err, result) => {
    try {
      if (err) {
        res.status(404).json({
          success: false,
          message: "USer not found",
          err: err,
        });
      }
      console.log("result", result);
      const checkpassword = result[0].student_password;
      console.log("Current Password", current_password);
      console.log("Check password", checkpassword);

      const isPasswordMatch = comparePasswords(current_password, checkpassword);
      isPasswordMatch.then((result) => {
        console.log("Is password match ", result);
        if (!result) {
          return res.status(401).json({
            success: false,
            message: "Current Password is incorrect",
          });
        }
        changeNewPassword(new_password, id, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Fail to Update Password",
              err: err,
            });
          }
          console.log(
            "[Student controller] result update user password",
            result
          );
          return res.status(200).json({
            success: true,
            message: "Update Password Successfully",
            result: result,
          });
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }
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
  changePasswordUser,
};
