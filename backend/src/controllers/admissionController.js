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
  getCourse,
  getStudents,
  getTutors,
  getClasses,
  getCustomerContacts,
  changeCustomerContactStatus,
  getLessonDetailAdmission,
  getLessonClassAdmission,
  getClassDetailAdmission,
  getSubjectAdminstration
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
        user: result,
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

  // Input validation
  if (
    !classData.class_name ||
    !classData.course_id ||
    !classData.tutor_id ||
    !classData.student_id ||
    !classData.admission_id
  ) {
    return res.status(400).send({
      success: false,
      message:
        "All fields are required: class_name, course_id, tutor_id, student_id, admission_id",
    });
  }

  // Call the model's addClass method
  addClass.create(classData, (err, result) => {
    if (err) {
      console.error("[createClass] Error creating class:", err);
      return res.status(500).send({
        success: false,
        message: "Error creating class",
        error: err.message,
      });
    }

    return res.status(201).send({
      success: true,
      message: "Class created successfully and linked to tutor and student!",
      data: result,
    });
  });
};

//getCourse
const getCourses = (req, res) => {
  // Call the model's getCourse method
  getCourse.get((err, result) => {
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
          message: "No Course not found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Course list fetched successfully",
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

const getStudentList = (req, res) => {
  // Call the model's getStudentList method
  getStudents((err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "Error fetching student list",
        error: err,
      });
    }
    if (result.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No student found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Student list fetched successfully",
      data: result,
    });
  });
};

const getTutorList = (req, res) => {
  // Call the model's getTutorList method
  getTutors((err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "Error fetching tutor list",
        error: err,
      });
    }
    if (result.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No tutor found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Tutor list fetched successfully",
      data: result,
    });
  });
};

const getClassList = (req, res) => {
  const admission_id = req.params.admission_id;
  if (!admission_id) {
    return res.status(400).send({
      success: false,
      message: "admission_id is required",
    });
  }
  // Call the model's getClassList method
  getClasses(admission_id, (err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "Error fetching class list",
        error: err,
      });
    }
    if (result.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No class found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Class list fetched successfully",
      class: result,
    });
  });
};

const getCustomerContactList = (req, res) => {
  // Call the model's getCustomerContactList method
  getCustomerContacts((err, result) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "Error fetching customer contact list",
        error: err,
      });
    }
    if (result.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No customer contact found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Customer contact list fetched successfully",
      data: result,
    });
  });
};

const changeCustomerContactProcessStatus = (req, res) => {
  const { customer_id } = req.params;
  const { status } = req.body;

  // Validate inputs
  if (!customer_id || !status) {
    return res.status(400).send({
      success: false,
      message: "Both customer_id and status are required",
    });
  }

  // Call the model's method
  changeCustomerContactStatus(customer_id, status, (err, result) => {
    if (err) {
      console.error("[changeCustomerContactProcessStatus] Error:", err);
      return res.status(500).send({
        success: false,
        message: "Error changing customer contact status",
        error: err.message,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Customer contact status changed successfully",
      data: result,
    });
  });
};

const getClassDetail = async (req, res) => {
  const class_id = req.params.class_id;

  if (!class_id) {
    return res.status(400).send({
      success: false,
      message: "class_id is required",
    });
  }

  console.log("[admissionControle] class_id", class_id);

  try {
    // Call the model's getClassDetail method
    const result = await getClassDetailAdmission(class_id);

    if (!result) {
      return res.status(404).send({
        success: false,
        message: "No class found",
      });
    }

    console.log("[admissionControle] Success: Class details fetched");
    return res.status(200).send({
      success: true,
      message: "Class details fetched successfully",
      class: result,
    });
  } catch (err) {
    console.error("[admissionControle] Error fetching class details:", err);
    return res.status(500).send({
      success: false,
      message: "Error fetching class details",
      error: err.message,
    });
  }
};

const getLessonDetail = async (req, res) => {
  const lesson_id = req.params.lesson_id;

  if (!lesson_id) {
    return res.status(400).send({
      success: false,
      message: "lesson_id is required",
    });
  }

  try {
    // Call the model's getLessonDetailAdmission method
    const result = await getLessonDetailAdmission(lesson_id);

    if (!result || result.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No lesson found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Lesson details fetched successfully",
      lesson: result,
    });
  } catch (err) {
    console.error("[getLessonDetail] Error fetching lesson details:", err);
    return res.status(500).send({
      success: false,
      message: "Error fetching lesson details",
      error: err.message,
    });
  }
};

const getLessonClass = async (req, res) => {
  const class_id = req.params.class_id;

  if (!class_id) {
    return res.status(400).send({
      success: false,
      message: "class_id is required",
    });
  }

  try {
    // Call the model's getLessonClassAdmission method
    const result = await getLessonClassAdmission(class_id);

    if (!result || result.length === 0) {
      return res.status(404).send({
        success: true,
        message: "No lesson found",
      });
    }

    console.log("[admissionControle] Success: Lesson details fetched");
    return res.status(200).send({
      success: true,
      message: "Lesson details fetched successfully",
      class: result,
    });
  } catch (err) {
    console.error("[admissionControle] Error fetching lesson details:", err);
    return res.status(500).send({
      success: false,
      message: "Error fetching lesson details",
      error: err.message,
    });
  }
};

const getSubject = (req, res) => {
  // Call the model's getSubject method
  getSubjectAdminstration((err, result) => {
    try {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Error fetching subject details",
          error: err,
        });
      }
      if (result.length === 0) {
        return res.status(404).send({
          success: false,
          message: "No Subject not found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Subject list fetched successfully",
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
}

module.exports = {
  getCourses,
  createClass,
  createStudentAccount,
  createTutorAccount,
  createTutor,
  createStudent,
  admissionSignIn,
  admissionUpdate,
  admissionGetInfo,
  updateAdmissionInfo,
  getStudentList,
  getTutorList,
  getClassList,
  getCustomerContactList,
  changeCustomerContactProcessStatus,
  getClassDetail,
  getLessonDetail,
  getLessonClass,
  getSubject
};
