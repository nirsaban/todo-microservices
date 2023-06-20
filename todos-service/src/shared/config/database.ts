import mongoose from "mongoose";

const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/homeTask";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
