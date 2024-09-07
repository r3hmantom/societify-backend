import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Middlewares
app.use(express.json());
app.use(cookieParser());

// For JWT authentication
app.use(express.urlencoded({ extended: true }));

// For User Authentication
app.post("/register", async (req, res) => {
  // When user is successfully created
  return res.status(201).json({ message: "User created succesfully " });
});

app.post("/login", async (req, res) => {
  // JWT token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000, // 1 hour
  });
  res.status(200).json({ message: "User logged in succesfully" });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "User logged out" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
