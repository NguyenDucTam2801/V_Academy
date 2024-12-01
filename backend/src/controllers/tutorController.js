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
        tutor: result,
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
const createLesson = async (req, res) => {
  const { lesson_topic, tutor_id, lesson_descript, lesson_note, lesson_url, lesson_startTime } = req.body;

  // Check for required fields
  if (!lesson_topic || !tutor_id || !lesson_descript) {
    return res.status(400).json({ error: 'Missing required fields: lesson_topic, tutor_id, or lesson_descript' });
  }

  try {
    // Call the addLesson function
    const result = await addLesson({
      lesson_topic,
      tutor_id,
      lesson_descript,
      lesson_note,
      lesson_url,
      lesson_startTime,
    });
    // Respond with success message
    return res.status(201).json({
      message: 'Lesson added successfully',
      data: result,
    });
  } catch (err) {
    // Respond with error if the lesson creation fails
    console.error('Error adding lesson:', err);
    return res.status(500).json({ error: 'Failed to add lesson' });
  }
};

// Controller to get the newest lesson
const getNewest = async (req, res) => {
  try {
    const lesson = await getNewestLesson();
    if (!lesson) {
      return res.status(404).json({ message: 'No lessons found' });
    }
    return res.status(200).json({
      message: 'Newest lesson fetched successfully',
      data: lesson,
    });
  } catch (err) {
    console.error('Error fetching newest lesson:', err);
    return res.status(500).json({ error: 'Failed to fetch newest lesson' });
  }
};

// Controller to associate a lesson with a class
const addLessonToClassController = async (req, res) => {
  const { classId, lessonId } = req.body;

  // Check for required fields
  if (!classId || !lessonId) {
    return res.status(400).json({ error: 'Missing classId or lessonId' });
  }

  try {
    // Call the addLessonToClass function
    const result = await addLessonToClass(classId, lessonId);
    return res.status(201).json({
      message: 'Lesson added to class successfully',
      data: result,
    });
  } catch (err) {
    console.error('Error adding lesson to class:', err);
    return res.status(500).json({ error: 'Failed to add lesson to class' });
  }
};

module.exports = {
  tutorSignIn,
  tutorUpdate,
  tutorGetInfo,
  createLesson,addLessonToClassController,
  getNewest
};
