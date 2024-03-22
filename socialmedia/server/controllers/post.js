import User from "../models/user.js";
import Post from "../models/post.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
  try {
    const { author, text } = req.body;
    let { image } = req.body;

    if (!author || !text) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await User.findById(author);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to perform this action" });
    }
    const maxLength = 500;
    if (text.length > maxLength) {
      return res.status(400).json({
        error: `Text length should be less than ${maxLength} characters`,
      });
    }

    if (image) {
      const uploadResult = await cloudinary.uploader.upload(image);
      image = uploadResult.secure_url;
    }

    const newPost = new Post({
      author,
      text,
      image,
    });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in createPost : ", error.mesage);
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getPost : ", error.mesage);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to perform this action" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in deletePost : ", error.mesage);
  }
};

const likeUnlike = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const isLiked = post.likes.includes(req.user._id);
    if (isLiked) {
      await Post.updateOne(
        { _id: id },
        {
          $pull: { likes: req.user._id },
        }
      );
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in likeUnlike : ", error.mesage);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) {
      return res.status(400).json({ error: "Please enter text" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author.toString() === userId.toString()) {
      return res
        .status(401)
        .json({ error: "You can't reply to your own post" });
    }

    const reply = {
      userId,
      text,
      userProfilePic,
      username,
    };
    post.replies.push(reply);
    await post.save();

    res.status(200).json({ message: "Reply added successfully", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in replyToPost : ", error.mesage);
  }
};

const getFeedPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const following = user.following;

    const feedposts = await Post.find({ author: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ feedposts });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getFeedPost : ", error.mesage);
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnlike,
  getFeedPost,
  replyToPost,
};
