import express from "express";
import {
  allusers,
  followUser,
  getUserProfile,
  loginUser,
  logout,
  signupUser,
  updateUser,
} from "../controllers/user.js";
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.get("/profile/:query", getUserProfile);

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/follow/:id", protectRoute, followUser);
router.put("/update/:id", protectRoute, updateUser);

router.get("/allusers", protectRoute, allusers);

export default router;
