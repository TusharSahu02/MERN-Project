import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Database
import connectionToMongoDB from "./database/connection.js";

// Routes
import authRoutes from "./routes/authroutes.js";
import messageRoute from "./routes/messageRoute.js";
import userRoute from "./routes/userRoute.js";

import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

dotenv.config();

// Middlwares
app.use(express.json()); //to parse the incomming request with JSON payload (from req.body)
app.use(cookieParser()); //to parse the incomming request with cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("hello world!");
});

server.listen(PORT, () => {
  connectionToMongoDB();
  console.log(`Server Started at : ${PORT}`);
});

console.log("Test");
