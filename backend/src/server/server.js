const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

// Secret key dùng để ký JWT
const JWT_SECRET = "your_jwt_secret_key";

// Mock dữ liệu người dùng
const mockUsers = [
  { id: 1, username: "user1", password: "$2a$10$gVm5XjIaT.y7s.wMkO.wO.qV9DlUrcI4sDBbhCdoRfLf9E6yhhv7G", role: "user" },
  { id: 2, username: "tutor1", password: "$2a$10$gVm5XjIaT.y7s.wMkO.wO.qV9DlUrcI4sDBbhCdoRfLf9E6yhhv7G", role: "tutor" },
  { id: 3, username: "admin1", password: "$2a$10$gVm5XjIaT.y7s.wMkO.wO.qV9DlUrcI4sDBbhCdoRfLf9E6yhhv7G", role: "admission" }
];

// Route đăng nhập
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
// sadjlsajdilsajdlisad
  // Tìm người dùng trong mockUsers
  const user = mockUsers.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Kiểm tra mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Tạo JWT token chứa role
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h"
  });

  return res.json({ token });
});

// Middleware để kiểm tra quyền truy cập dựa trên role
const authorize = (roles) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

// Ví dụ về route chỉ cho phép "tutor" và "admission" truy cập
app.get("/api/protected/tutor-admission", authorize(["tutor", "admission"]), (req, res) => {
  res.json({ message: "Welcome, authorized tutor or admission user!" });
});

// Ví dụ về route chỉ cho phép "user" truy cập
app.get("/api/protected/user", authorize(["user"]), (req, res) => {
  res.json({ message: "Welcome, authorized regular user!" });
});

// Khởi động server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
