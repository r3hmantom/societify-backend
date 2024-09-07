// Import any necessary modules or dependencies
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import billModel from "../models/bill.model.js";

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

  // Sign the JWT token and send it in the response
  const token = jwt.sign(
    { email: newUser.email, role: newUser.role, _id: newUser._id },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(201).json({ message: "User created" });
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

  return res.status(200).json({
    message: "Logged in",
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
      _id: user,
    },
  });
};

// Get All Users
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  return res.status(200).json(users);
};

// Me
export const me = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const bills = await billModel.find({ email: user.email });
  return res.status(200).json({
    user,
    bills,
  });
};

// Get my Bills
export const getMyBills = async (req, res) => {
  const user = await User.findById(req.user._id);

  const bills = await billModel.find({ email: user.email });
  return res.status(200).json(bills);
};
