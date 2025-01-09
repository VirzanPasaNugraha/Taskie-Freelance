import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false, // Gambar pengirim bisa kosong
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    cvImage: {
      type: String, // URL atau path untuk file CV yang diunggah
      required: false, // Tidak wajib diisi
    },
    certificateImages: {
      type: [String], // URL atau path untuk file sertifikat yang diunggah
      default: [], // Tidak wajib diisi
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
