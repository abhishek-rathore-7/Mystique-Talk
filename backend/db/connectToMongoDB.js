import mongoose from "mongoose";

/**
 * Function to connect to MongoDB database
 */
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "Mystique-Talk",
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Failed to connect to MongoDB");
    console.log("Message: " + e.message);
  }
};

export default connectToMongoDB;
