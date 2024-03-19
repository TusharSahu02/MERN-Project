import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./db/connectDB.js";
import user from "./routes/user.js";
import post from "./routes/post.js";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

// it allows us to parse JSON data from the incoming request body
app.use(express.json());
// to parse form data in the request body
app.use(express.urlencoded({ extended: true }));
// it allows us to parse cookies from the request
app.use(cookieParser());

// Routes
app.use("/api/users", user);
app.use("/api/posts", post);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
