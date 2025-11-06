import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// تسجيل مستخدم جديد
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // التأكد أن الإيميل مش موجود مسبقًا
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "Email already exists" });

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// تسجيل الدخول
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
