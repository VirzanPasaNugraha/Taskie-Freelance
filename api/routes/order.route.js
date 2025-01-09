import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm, getEarnings } from "../controllers/order.controller.js";

const router = express.Router();

// Endpoint untuk mendapatkan daftar orders berdasarkan user
router.get("/", verifyToken, getOrders);

// Endpoint untuk membuat payment intent
router.post("/create-payment-intent/:id", verifyToken, intent);

// Endpoint untuk mengonfirmasi pembayaran dan menyelesaikan order
router.put("/", verifyToken, confirm);

// Endpoint untuk mendapatkan penghasilan berdasarkan ID pengguna
router.get("/earnings/:id", verifyToken, getEarnings);







export default router;
