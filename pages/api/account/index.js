import connectMongoose from "@/databases/mongoose";
import User from "@/models/User";

export default async function handler(req, res) {
  const connection = await connectMongoose();
  try {
    if (req.method === "GET") {
      const { email } = req.query;

      if (!email) {
        const users = await User.find();

        return res.status(200).json({
          message: "Success",
          status: 200,
          ok: true,
          users,
        });
      } else {
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(404).json({
            message: "User Not Found",
            status: 404,
            data: user,
            connection,
            query: req.query,
          });
        }

        return res.status(200).json({
          message: "Success",
          status: 200,
          data: user,
          connection,
        });
      }
    }

    if (req.method === "POST") {
      const { user, provider } = req.body;

      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        return res.status(201).json({
          message: "Success",
          status: 201,
          ok: true,
          user: existingUser,
        });
      }

      const result = await User.create({
        email: user.email,
        username: user.name,
        provider: {
          name: provider.name,
          id: provider.id,
        },
        images: {
          profile: {
            buffer: user?.image?.buffer || null,
            url: user?.image || "",
          },
        },
      });

      res.status(200).json({
        result,
        message: "Success",
        ok: true,
        status: 200,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed",
      status: 500,
      error: error.message,
      connection,
      params: req.params,
    });
  }
}
