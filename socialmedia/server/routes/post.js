import express from "express";
import protectRoute from "../middlewares/protectRoute.js";

import {
  createPost,
  deletePost,
  getPost,
  likeUnlike,
  replyToPost,
  getFeedPost
} from "../controllers/post.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPost);

router.get("/:id", getPost);

router.post("/create", protectRoute, createPost);

router.delete("/:id", protectRoute, deletePost);

router.post("/like/:id", protectRoute, likeUnlike);

router.post("/reply/:id", protectRoute, replyToPost);

export default router;
