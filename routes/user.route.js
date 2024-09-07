import express from "express";
import { createUser, loginUser, me } from "../controllers/user.controller.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

// GET /users
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/me", authenticateToken, me);

export default router;
