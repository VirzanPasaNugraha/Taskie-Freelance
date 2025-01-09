import express from "express";
import { deleteUser, getUser, saveUserImages, getUserImages, getUserProfile, getUserById } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.put("/:id/images", saveUserImages);
router.get("/:id/images", getUserImages);
router.get("/userProfile/:id", getUserProfile); 
router.get("/:id", getUserById);


export default router;
