const db = require("../config/db");
const {
  TutorCreate,
  TutorList,
  signInTutor,
  validatePassword,
  getTutorInfo,
  updateTutorInfo,
  getTutorClass,
  getTutorLessonClass,
  getTutorClassDetail,
  getTutorLessonDetail,
  addLesson,
  addLessonToClass,
  getNewestLesson,
} = require("../models/tutorModel");

const {
  createTokenTutor,
  verifyToken,
  hashPassword,
  comparePasswords,
} = require("../middleware/authenticationRoute");

const tutorSignIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const tutorAccount = await signInTutor(username);

    if (!tutorAccount) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    const isPasswordMatch = await comparePasswords(
      password,
      tutorAccount.tutor_password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const tutor = getTutorInfo(tutorAccount.tutor_id);

    tutor.then((result) => {
      res.status(200).json({
        token: createTokenTutor(result),
        message: "Login successful",
        user: result,
      });
    });
  } catch (err) {
    console.error("[TutorController]", err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const tutorUpdate = (req, res) => {
  const tutorInfo = req.body;

  try {
    console.log("Tutor Info", tutorInfo.tutor_id);
    updateTutorInfo(tutorInfo.tutor_id, tutorInfo);
    res.status(200).json({
      success: true,
      message: "Tutor information updated successfully",
    });
  } catch (err) {
    console.error("[TutorController]", err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const tutorGetInfo = (req, res) => {
  const tutorData = getTutorInfo(req.params.id);
  tutorData.then((result) => {
    if (!result) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.status(200).json({ message: "Tutor found", tutor: result });
  });
};
const createLessontoClass = async (req, res) => {
  const {
    lesson_topic,
    lesson_descript,
    lesson_note,
    lesson_url,
    lesson_startTime
  } = req.body;

  const { class_id } = req.params;

  // console.log("[tutorController] createLessontoClass", req.body, class_id);

  // Check for required fields
  if (!lesson_topic|| !class_id || !lesson_descript|| !lesson_url|| !lesson_startTime) {
    return res
      .status(400)
      .json({
        error:
          "Missing required fields: Missing Information, Please Check input data and Try Again",
      });
  }

  try {
    // Call the addLesson function
    const result = await addLesson({
      lesson_topic,
      lesson_descript,
      lesson_note,
      lesson_url,
      lesson_startTime
    }, class_id);
    // Respond with success message
    return res.status(201).json({
      message: "Lesson added successfully",
      data: result,
    });
  } catch (err) {
    // Respond with error if the lesson creation fails
    console.error("Error adding lesson:", err);
    return res.status(500).json({ error: "Failed to add lesson" });
  }
};

// Controller to get the newest lesson
// const getNewest = async (req, res) => {
//   try {
//     const lesson = await getNewestLesson();
//     if (!lesson) {
//       return res.status(404).json({ message: "No lessons found" });
//     }
//     return res.status(200).json({
//       message: "Newest lesson fetched successfully",
//       data: lesson,
//     });
//   } catch (err) {
//     console.error("Error fetching newest lesson:", err);
//     return res.status(500).json({ error: "Failed to fetch newest lesson" });
//   }
// };

// // Controller to associate a lesson with a class
// const addLessonToClassController = async (req, res) => {
//   const { classId, lessonId } = req.body;

//   // Check for required fields
//   if (!classId || !lessonId) {
//     return res.status(400).json({ error: "Missing classId or lessonId" });
//   }

//   try {
//     // Call the addLessonToClass function
//     const result = await addLessonToClass(classId, lessonId);
//     return res.status(201).json({
//       message: "Lesson added to class successfully",
//       data: result,
//     });
//   } catch (err) {
//     console.error("Error adding lesson to class:", err);
//     return res.status(500).json({ error: "Failed to add lesson to class" });
//   }
// };

// Controller to get the details of a specific lesson for a tutor
const getTutorLessonDetailController = async (req, res) => {
  const { lesson_id } = req.params;

  try {
    const lessonDetail = await getTutorLessonDetail(lesson_id);

    if (!lessonDetail) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    return res.status(200).json({
      message: "Lesson detail fetched successfully",
      lesson: lessonDetail,
    });
  } catch (err) {
    console.error("Error fetching lesson detail:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch lesson detail", details: err.message });
  }
};

// Controller to get the details of a specific class for a tutor
const getTutorClassDetailController = async (req, res) => {
  const { class_id } = req.params;

  try {
    const classDetail = await getTutorClassDetail(class_id);

    if (!classDetail) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({
      message: "Class detail fetched successfully",
      class: classDetail,
    });
  } catch (err) {
    console.error("Error fetching class detail:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch class detail", details: err.message });
  }
};

// Controller to get the classes associated with a tutor
const getTutorClassController = async (req, res) => {
  const { id } = req.params;
  console.log("[tutorController]: getTutorClassController", id);
  try {
    const classes = await getTutorClass(id);

    if (!classes || classes.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes found for this tutor" });
    }

    return res.status(200).json({
      message: "Classes fetched successfully",
      class: classes,
    });
  } catch (err) {
    console.error("Error fetching classes:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch classes", details: err.message });
  }
};

// Controller to get the lessons associated with a class for a tutor
const getTutorLessonClassController = async (req, res) => {
  const { class_id } = req.params;

  try {
    const lessons = await getTutorLessonClass(class_id);

    if (!lessons || lessons.length === 0) {
      return res
        .status(404)
        .json({ message: "No lessons found for this class" });
    }

    return res.status(200).json({
      message: "Lessons for class fetched successfully",
      class: lessons,
    });
  } catch (err) {
    console.error("Error fetching lessons for class:", err);
    return res
      .status(500)
      .json({
        error: "Failed to fetch lessons for class",
        details: err.message,
      });
  }
};

module.exports = {
  getTutorClassController,
  getTutorClassDetailController,
  getTutorLessonClassController,
  getTutorLessonDetailController,
  tutorSignIn,
  tutorUpdate,
  tutorGetInfo,
  createLessontoClass
};
