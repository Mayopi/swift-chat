import connectMongoose from "@/databases/mongoose";
import User from "@/models/User";
import FriendRequest from "@/models/FriendRequest";

export default async function handler(req, res) {
  try {
    const connection = await connectMongoose();

    const { sender, recipient } = req.body;

    if (!sender || !recipient)
      return res.status(400).json({
        message: "Failed",
        status: 400,
        error: "Sender and Recipient information is required!",
      });

    if (req.method !== "POST") {
      return res.status(400).json({
        message: "Failed",
        status: 400,
        error: "Only POST Request are Allowed.",
      });
    }

    const result = await addFriend(sender, recipient);

    return res.status(200).json({
      message: "Success",
      status: 200,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed",
      status: 500,
      error: error.message,
    });
  }
}

const addFriend = async (senderEmail, recipientEmail) => {
  try {
    const sender = await User.findOne({ email: senderEmail });
    const recipient = await User.findOne({ email: recipientEmail });

    const existingRequest = await FriendRequest.findOne({
      sender: sender._id,
      recipient: recipient._id,
    });

    if (!existingRequest) {
      const friendRequest = new FriendRequest({
        sender: sender._id,
        recipient: recipient._id,
      });

      friendRequest.save();

      recipient.friendRequest.push(friendRequest._id);
      recipient.notification.friendRequest.push(friendRequest._id);
      recipient.save();
    }

    return "Friend Request Sended";
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
