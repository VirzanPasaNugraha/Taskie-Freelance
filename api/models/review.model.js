import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig", // Referencing the Gig model
      required: true,
    },
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing the User model
      required: true,
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5], // Ensuring only valid star ratings are allowed (1-5)
    },
    desc: {
      type: String,
      required: true, // Review description is required
    },
    yesVotes: {
      type: Number,
      default: 0, // Default is 0 votes for yes
    },
    noVotes: {
      type: Number,
      default: 0, // Default is 0 votes for no
    },
    votedUsers: [
      {
        userId: {
          type: String,
          ref: "User", // Referencing the User who voted
          required: true,
        },
        voteType: {
          type: String,
          enum: ["yes", "no"], // The type of vote (yes or no)
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default mongoose.model("Review", ReviewSchema);
