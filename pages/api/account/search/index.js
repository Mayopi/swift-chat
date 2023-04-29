import connectMongoose from "@/databases/mongoose";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    const connection = await connectMongoose();

    const { email, sender } = req.body;

    if (email === sender.user.email) {
      return res.status(400).json({
        message: "Failed",
        status: 400,
        error: "Cannot Add Friend for yourself",
      });
    }

    if (req.method !== "POST") {
      return res.status(400).json({
        message: "Failed",
        status: 400,
        error: "Only POST Request are Allowed!",
      });
    }

    if (req.method === "POST") {
      if (!email) {
        return res.status(400).json({
          message: "Failed",
          status: 400,
          error: "Email field is required",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "404 Not Found",
          status: 404,
          error: `User is not found with Email of ${email}`,
        });
      }

      return res.status(200).json({
        message: "Success",
        status: 200,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      status: 500,
      error: error.message,
    });
  }
}
