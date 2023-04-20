import mongoose from "mongoose";

let isConnected;

const connectMongoose = async () => {
  if (isConnected) {
    return Promise.resolve("Already connected to MongoDB Atlas");
  }

  try {
    await mongoose.connect(process.env.MONGO_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    return Promise.resolve("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error.message);
    isConnected = false;
    return Promise.reject(error.message);
  }
};

export default connectMongoose;
