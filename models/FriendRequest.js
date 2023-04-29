import { Schema, models, model } from "mongoose";

const FriendRequestSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FriendRequest = models.FriendRequest || model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
