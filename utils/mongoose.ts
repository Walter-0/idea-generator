import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    // if connection is open return the instance of the databse for cleaner queries
    return mongoose.connection.db;
  }

  return mongoose.connect(uri);
}

export default dbConnect;
