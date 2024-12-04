app.use("/api/tutor", require("./src/routes/admissionRoute"));
app.use("/api/admission", require("./src/routes/tutorRoute"));