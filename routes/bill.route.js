import express from "express";
import {
  addBill,
  getAllBills,
  getBill,
  updateBill,
} from "../controllers/bill.controller.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", addBill);
router.get("/all", getAllBills);
router.get("/bill/:id", authenticateToken, getBill);
router.post("/update/:id", authenticateToken, updateBill);

export default router;
