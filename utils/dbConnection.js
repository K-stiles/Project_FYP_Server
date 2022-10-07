import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

async function dbConnection() {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnection;
