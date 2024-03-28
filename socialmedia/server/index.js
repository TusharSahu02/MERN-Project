import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./db/connectDB.js";
import user from "./routes/user.js";
import post from "./routes/post.js";

import { v2 as cloudinary } from "cloudinary";
import path from "path";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

// it allows us to parse JSON data from the incoming request body
app.use(express.json({ limit: "50mb" }));
// to parse form data in the request body
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// it allows us to parse cookies from the request
app.use(cookieParser());

// Routes
app.use("/api/users", user);
app.use("/api/posts", post);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
