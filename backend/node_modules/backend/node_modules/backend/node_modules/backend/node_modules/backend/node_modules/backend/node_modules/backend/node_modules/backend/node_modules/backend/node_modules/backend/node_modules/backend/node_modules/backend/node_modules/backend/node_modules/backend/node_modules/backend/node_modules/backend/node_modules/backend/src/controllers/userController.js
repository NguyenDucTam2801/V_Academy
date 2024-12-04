const bcrypt = require("bcryptjs");
const pool = require("../config/db");

exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [req.user.id]);
    const user = rows[0];

    // Kiểm tra mật khẩu cũ
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Mã hóa mật khẩu mới và cập nhật vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, req.user.id]);

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, username, role FROM users");
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
