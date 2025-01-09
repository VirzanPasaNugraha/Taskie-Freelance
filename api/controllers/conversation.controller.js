import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

// Create a new conversation
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

// Update conversation (mark as read)
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    )
      .populate("sellerId", "username")
      .populate("buyerId", "username");

    if (!updatedConversation) return next(createError(404, "Conversation not found!"));

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

// Get a single conversation
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id })
      .populate("sellerId", "username")
      .populate("buyerId", "username");

    if (!conversation) return next(createError(404, "Conversation not found!"));

    const formattedConversation = {
      id: conversation.id,
      sellerId: conversation.sellerId?._id || null,
      sellerUsername: conversation.sellerId?.username || null,
      buyerId: conversation.buyerId?._id || null,
      buyerUsername: conversation.buyerId?.username || null,
      lastMessage: conversation.lastMessage,
      readBySeller: conversation.readBySeller,
      readByBuyer: conversation.readByBuyer,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };

    res.status(200).send(formattedConversation);
  } catch (err) {
    next(err);
  }
};

// Get all conversations for a user
export const getConversation = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    )
      .sort({ updatedAt: -1 })
      .populate("sellerId", "username")
      .populate("buyerId", "username");

    const formattedConversations = conversations
      .filter(
        (conv) => conv.sellerId && conv.buyerId // Ensure both sellerId and buyerId exist
      )
      .map((conv) => ({
        id: conv.id,
        sellerId: conv.sellerId._id,
        sellerUsername: conv.sellerId.username,
        buyerId: conv.buyerId._id,
        buyerUsername: conv.buyerId.username,
        lastMessage: conv.lastMessage,
        readBySeller: conv.readBySeller,
        readByBuyer: conv.readByBuyer,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
      }));

    res.status(200).send(formattedConversations);
  } catch (err) {
    next(err);
  }
};

// Delete a conversation
export const deleteConversation = async (req, res, next) => {
  try {
    const deletedConversation = await Conversation.findOneAndDelete({ id: req.params.id });

    if (!deletedConversation) return next(createError(404, "Conversation not found!"));

    res.status(200).send({ message: "Conversation deleted successfully!" });
  } catch (err) {
    next(err);
  }
};
