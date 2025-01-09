import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Stripe from "stripe";



// Initialize express app
const app = express();

// Load environment variables
dotenv.config();
mongoose.set("strictQuery", true);

// MongoDB connection function
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};


const stripe = Stripe(process.env.STRIPE);

// Middlewares
app.use(cors({ 
  origin: "http://localhost:5173", // Your frontend address
  credentials: true,               // Allow credentials like cookies
}));
app.use(express.json());            // Parse JSON request bodies
app.use(cookieParser());            // Parse cookies

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);




app.get("/api/earnings/:id", async (req, res) => {
  const { id } = req.params; // ID pengguna yang diterima dari parameter URL

  try {
    // Ambil saldo dari Stripe
    const balance = await stripe.balance.retrieve();

    if (balance && balance.available && balance.available.length > 0) {
      // Mengambil jumlah yang tersedia (dalam cents) dan mengonversinya ke dolar
      const earningsInUSD = balance.available[0].amount / 100;  // Mengonversi cent ke dolar

      // Nilai tukar 1 USD ke IDR
      const exchangeRate = 15885;  // Sesuaikan dengan nilai tukar yang sesuai
      const earningsInRupiah = earningsInUSD * exchangeRate; // Mengonversi ke IDR

      // Mengembalikan penghasilan dalam Rupiah
      return res.status(200).json({
        userId: id,
        earnings: earningsInRupiah,  // Penghasilan dalam Rupiah
      });
    } else {
      return res.status(500).json({ error: "Saldo Stripe tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error fetching earnings from Stripe:", error);
    return res.status(500).json({ error: "Gagal mengambil penghasilan dari Stripe" });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {}, // Show stack in development only
  });
});
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

// Start the server
app.listen(8800, () => {
  connect();  // Ensure DB connection before starting the server
  console.log("Backend server is running on port 8800!");
});

