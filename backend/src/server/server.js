require("dotenv").config();
const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authorize = require("./authMiddleware");

const app = express();
app.use(express.json());

// Routes xác thực
app.post("/api/auth/login", authController.login);
app.post("/api/auth/refresh-token", authController.refreshToken);

// Routes người dùng
app.put("/api/auth/update-password", authorize(["user", "tutor", "admission"]), userController.updatePassword);
app.get("/api/users", authorize(["admission"]), userController.getAllUsers);

// Các route được bảo vệ
app.get("/api/protected/tutor-admission", authorize(["tutor", "admission"]), (req, res) => {
  res.json({ message: "Welcome, authorized tutor or admission user!" });
});

app.get("/api/protected/user", authorize(["user"]), (req, res) => {
  res.json({ message: "Welcome, authorized regular user!" });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
