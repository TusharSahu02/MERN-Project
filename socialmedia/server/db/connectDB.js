import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // This is to avoid warnings in the console
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    });

    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to DB: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
