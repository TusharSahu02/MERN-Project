import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@crud-app.0ljhtnc.mongodb.net/?retryWrites=true&w=majority&appName=crud-app`;
  try {
    await mongoose.connect(URL, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error while connecting with database ", error);
  }
};

export default Connection;
