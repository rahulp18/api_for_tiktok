import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    videoUrl: String,
    likes: {
      type: Array,
      default: [],
    },
    dislikes: {
      type: Array,
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    public_id: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
