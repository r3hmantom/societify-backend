import express from "express";
import {
  createUser,
  getMyBills,
  loginUser,
  me,
} from "../controllers/user.controller.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

// GET /users
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});
router.get("/me", authenticateToken, me);
router.get("/me/bills", authenticateToken, getMyBills);

export default router;
