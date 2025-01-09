import mongoose from 'mongoose';
import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
  updateGig,
  getTotalSales
} from "../controllers/gig.controller.js";
import validateGigUpdate from "../middleware/validation.js";
import upload from "../middleware/uploadMiddleware.js";
import { verifyToken } from "../middleware/jwt.js";
import Gig from "../models/gig.model.js"; // Pastikan path model sesuai dengan struktur Anda

const router = express.Router();

// Route untuk membuat Gig  
router.post("/", verifyToken, createGig);


// Route untuk mendapatkan total penjualan berdasarkan userId
router.get("/totalSales/:userId", verifyToken, getTotalSales);

// Route untuk menghapus Gig
router.delete("/:id", verifyToken, deleteGig);

// Route untuk mendapatkan Gig berdasarkan ID
router.get("/single/:id", verifyToken, getGig);

// Route untuk mendapatkan semua Gig
router.get("/", getGigs);

// Route untuk memperbarui Gig
router.put("/:id", validateGigUpdate, updateGig);

// Route untuk mengupload gambar Gig
router.post("/:id/upload", verifyToken, upload.single("image"), async (req, res, next) => {
  try {
    const gigId = req.params.id;
    const imageUrl = req.file.path; // Gambar yang diupload disimpan di dalam `req.file`

    // Cari gig yang akan diupdate
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Periksa apakah gambar yang diupload adalah cover atau gambar tambahan
    if (req.body.type === "cover") {
      // Jika gambar cover
      gig.cover = imageUrl;
    } else if (req.body.type === "image") {
      // Jika gambar tambahan, tambahkan ke array `images`
      gig.images.push(imageUrl);
    }

    await gig.save();

    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  } catch (err) {
    next(err);
  }
});



export default router;
