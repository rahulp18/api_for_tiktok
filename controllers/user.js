import User from "../models/userModel.js";
import { upload } from "../utils/uploadVideos.js";
import Post from "../models/postModel.js";
export const updatePicture = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const user = await User.findById(req.user._id);
    const result = await upload("images", profilePic);

    user.profilePic = result.secure_url;
    user.public_id = result.public_id;
    await user.save();

    res
      .status(200)
      .json({ type: "success", message: "Data saved successfully" });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ type: "success", data: user });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};
export const getInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ type: "success", data: user });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ type: "success", data: user });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};

export const like = async (req, res, next) => {
  try {
    const id = req.user._id;
    const videoId = req.params.videoId;
    await Post.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json({ message: "The video has been liked." });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};
// dislike
export const dislike = async (req, res, next) => {
  try {
    const id = req.user._id;
    const videoId = req.params.videoId;
    await Post.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json({ message: "The video has been disliked." });
  } catch (error) {
    res.json(400).json({ message: error.message });
  }
};
