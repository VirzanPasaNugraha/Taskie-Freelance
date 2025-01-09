import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";

// Konstanta nilai tukar dari Rupiah ke USD (misal 1 USD = 15,000 IDR)
const IDR_TO_USD_CONVERSION_RATE = process.env.IDR_TO_USD_CONVERSION_RATE || 15885;

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  try {
    // Mendapatkan gig berdasarkan ID yang dikirimkan dalam parameter
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return next(createError(404, "Gig not found"));
    }

    // Mengonversi harga dari IDR ke USD
    const priceInUSD = gig.price / IDR_TO_USD_CONVERSION_RATE;

    // Membuat payment intent di Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(priceInUSD * 100), // Stripe menerima amount dalam satuan sen (cents)
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Periksa apakah order sudah ada untuk menghindari duplikasi
    const existingOrder = await Order.findOne({
      gigId: gig._id,
      buyerId: req.userId,
      isCompleted: false, // Tidak mempertimbangkan order yang sudah selesai
    });

    if (existingOrder) {
      return res.status(400).json({ message: "Anda sudah memiliki order yang belum selesai untuk gig ini" });
    }

    // Membuat order baru
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      price: gig.price,
      sellerId: gig.userId,
      buyerId: req.userId,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    // Mengirimkan clientSecret untuk proses pembayaran di frontend
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Payment intent error:", err);  // Menambah log untuk debugging
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    // Menampilkan daftar order berdasarkan user (seller atau buyer)
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    }).populate("gigId");

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    // Mencari order berdasarkan payment_intent untuk konfirmasi pembayaran
    const order = await Order.findOne({
      payment_intent: req.body.payment_intent,
      isCompleted: false, // Pastikan hanya order yang belum selesai
    });

    if (!order) {
      return next(createError(404, "Order not found"));
    }

    // Update status order menjadi selesai
    order.isCompleted = true;
    await order.save();

    // Update sales pada gig setelah order selesai
    const gig = await Gig.findById(order.gigId);
    if (!gig) {
      return next(createError(404, "Gig not found"));
    }

    gig.sales += 1; // Tambahkan satu ke sales
    await gig.save(); // Simpan perubahan pada gig

    res.status(200).send("Order has been confirmed and sales updated.");
  } catch (err) {
    next(err);
  }
};

// Fungsi untuk mendapatkan penghasilan berdasarkan ID pengguna
export const getEarnings = async (req, res, next) => {
  try {
    const { id } = req.params;  // Menggunakan :id dari URL parameter untuk userId
    const orders = await Order.find({ sellerId: id, isCompleted: true });

    if (!orders.length) {
      return res.status(404).json({ message: "No completed orders found for this user." });
    }

    // Hitung total penghasilan berdasarkan harga dari setiap order
    const earnings = orders.reduce((total, order) => total + order.price, 0);
    res.status(200).json({
      userId: id,
      earnings: earnings,  // Penghasilan dalam IDR (berdasarkan order yang selesai)
    });
  } catch (err) {
    next(err);
  }
};
