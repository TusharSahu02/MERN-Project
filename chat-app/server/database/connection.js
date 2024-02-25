import mongoose from "mongoose";

const connectionToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Errow while connecting to MongoDB", error.message);
}
};

export default connectionToMongoDB;
