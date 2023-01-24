import Post from "../models/postModel.js";
import { destroyVideo, upload } from "../utils/uploadVideos.js";

export const createPost = async (req, res) => {
  try {
    const { title, video } = req.body;
    const result = await upload("videos", video);
    const newPost = new Post({
      title: title,
      userId: req.user._id,
      videoUrl: result.secure_url,
      public_id: result.public_id,
    });
    await newPost.save();
    res.status(200).json({ type: "Success", data: newPost });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (req.body?.video) {
      destroyVideo(post.public_id);
      let result = await upload("/videos", req.body.video);
      post.public_id = result.public_id;
      post.videoUrl = result.secure_url;
    }
    post.title = req.body.title;
    await post.save();

    res
      .status(200)
      .json({ status: "success", message: "Updated successfully" });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ status: "success", message: "deleted successfully" });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};
export const singlePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ status: "success", data: post });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};
export const getOwnPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id });
    res.status(200).json({ status: "success", data: posts });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};
export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ status: "success", data: posts });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};

export const addView = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res
      .status(200)
      .json({ type: "Success", message: "The view has been increased" });
  } catch (error) {
    next(error);
  }
};

// trand
export const trandVideos = async (req, res, next) => {
  try {
    const videos = await Post.find().sort({ views: -1 });
    res.status(200).json({ type: "success", data: videos });
  } catch (error) {
    next(error);
  }
};

// Search
export const search = async (req, res, next) => {
  const query = req.query.q;

  try {
    const videos = await Post.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json({ type: "success", data: videos });
  } catch (error) {
    next(error);
  }
};
