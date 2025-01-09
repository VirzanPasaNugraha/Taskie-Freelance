// api/middleware/uploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Setup penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Menentukan folder untuk menyimpan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Membuat nama file unik berdasarkan timestamp
  },
});

// Filter untuk hanya menerima gambar
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true); // File valid
  }
  cb("Invalid file type. Only JPG, JPEG, and PNG files are allowed.");
};

// Inisialisasi multer dengan konfigurasi
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Membatasi ukuran file maksimal 5MB
});

export default upload;
