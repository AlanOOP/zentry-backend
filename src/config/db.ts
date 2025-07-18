import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async (): Promise<void> => {
  try {
    const url = process.env.MONGO_URI || "mongodb://localhost:27017/zentry";
    const connection = await mongoose.connect(url);
    console.log(
      colors.green("Database connected:"),
      `${connection.connection.host}: ${connection.connection.port}`
    );
  } catch (error) {
    console.error(
      colors.bgRed.white.bold("Error connecting to the database:"),
      error
    );
    process.exit(1); // Exit the process with failure
  }
};
