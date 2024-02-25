import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import Routes from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Routes);

const PORT = 8000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`server started : ${PORT}`));
