import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const db = await mongoose
    .connect(process.env.MONGODB_URI as string)
    .catch((error) => console.log(error));

  console.log("Connected to database");

  return db;
};
