import express from "express";
import { sendMessage, getMessages } from "../controllers/message-controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// inserting middleware to check if the user is logged in or not
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
