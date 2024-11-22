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

module.exports = {
  tutorSignIn,
  tutorUpdate,
  tutorGetInfo,
};
