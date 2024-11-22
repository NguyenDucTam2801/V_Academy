const db = require("../config/db");
const {
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

const admissionGetInfo = (req, res) => {
  const admissionData = getAdmissionInfo(req.params.id);
  admissionData.then((result) => {
    if (!result) {
      return res.status(404).json({ message: "Admission officer not found" });
    }
    res.status(200).json({ message: "Admission officer found", admission: result });
  });
};

module.exports = {
  admissionSignIn,
  admissionUpdate,
  admissionGetInfo,
};
