import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },

    username: {
      type: String,
    },

    password: {
      type: String,
    },

    provider: {
      name: {
        type: String,
      },

      id: {
        type: String,
      },
    },

    images: {
      profile: {
        buffer: {
          type: Buffer,
        },

        url: {
          type: String,
        },
      },
    },

    friends: [
      {
        username: String,
        email: String,
        closeFriend: {
          type: Boolean,
          default: false,
        },
      },
    ],

    friendRequest: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    notification: {
      friendRequest: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      messages: [
        {
          username: String,
          content: String,
        },
      ],
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
