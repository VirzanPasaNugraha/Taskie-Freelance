import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import { format } from "date-fns"; // Import date-fns
import { id } from "date-fns/locale"; // Import locale untuk Indonesia

export const deleteUser = async (req, res, next) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Check if the logged-in user is trying to delete their own account
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }

    // Delete the user's orders
    await Order.deleteMany({ userId: user._id });

    // Delete the user's gigs
    await Gig.deleteMany({ userId: user._id });

    // Delete the user's reviews
    await Review.deleteMany({ userId: user._id });

    // Delete the user's conversations and messages
    await Conversation.deleteMany({ userId: user._id });
    await Message.deleteMany({ userId: user._id });

    // Delete the user
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User and all associated data deleted successfully." });
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while deleting the user",
      details: err.message,
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Format tanggal menggunakan date-fns
    const formattedDate = format(new Date(user.createdAt), "d MMMM yyyy, HH:mm:ss", { locale: id });

    res.status(200).json({
      ...user._doc, // Menyebarkan data user
      memberSince: formattedDate, // Menambahkan formatted date
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while retrieving the user", details: err.message });
  }
};

// Fungsi untuk menyimpan URL gambar CV dan sertifikat
export const saveUserImages = async (req, res) => {
  const { userId } = req.params;
  const { cvImage, certificateImages } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cvImage = cvImage;
    user.certificateImages = certificateImages;
    await user.save();

    res.status(200).json({ message: 'Images saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving images', error });
  }
};

// Fungsi untuk mengambil URL gambar CV dan sertifikat
export const getUserImages = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      cvImage: user.cvImage,
      certificateImages: user.certificateImages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving images', error });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    // Mencari pengguna berdasarkan ID dari parameter URL
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found")); // Menggunakan error handler
    }
    res.status(200).json(user); // Mengirimkan data pengguna sebagai respons
  } catch (err) {
    res.status(500).json({ 
      message: "Error retrieving user profile", 
      details: err.message 
    });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};