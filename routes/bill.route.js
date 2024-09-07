import express from "express";
import {
  addBill,
  getAllBills,
  getBill,
  updateBill,
} from "../controllers/bill.controller.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", authenticateToken, addBill);
router.get("/all", authenticateToken, getAllBills);
router.get("/bill/:id", authenticateToken, getBill);
router.put("/update/:id", authenticateToken, updateBill);

export default router;
