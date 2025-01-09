import express from "express";
import {
  createConversation,
  getConversation,
  getSingleConversation,
  updateConversation,
  deleteConversation,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getConversation);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);
router.delete("/:id", verifyToken, deleteConversation);

export default router;
