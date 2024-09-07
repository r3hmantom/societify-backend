// Import any necessary modules or dependencies
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Define the controller functions
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const alreadyExistsUser = await User.findOne({ email });

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const alreadyExists = await User.findOne({ username });
  if (alreadyExists) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  if (!newUser) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  return res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email: user.email, role: user.role, _id: user._id },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Login successful" });
};

// Me
export const me = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  return res.status(200).json(user);
};
