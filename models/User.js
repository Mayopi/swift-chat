import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
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

  friendRequest: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = models.User || model("User", UserSchema);

export default User;
