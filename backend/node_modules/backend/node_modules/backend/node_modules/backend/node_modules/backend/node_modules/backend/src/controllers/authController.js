const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Truy vấn để tìm người dùng theo username
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    const user = rows[0];

    // Kiểm tra nếu người dùng không tồn tại hoặc mật khẩu không đúng
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Kiểm tra nếu người dùng đã tồn tại
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Mã hóa mật khẩu và chèn người dùng mới vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, hashedPassword, role]);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.refreshToken = (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
    const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token: newToken });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
