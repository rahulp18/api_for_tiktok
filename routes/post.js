import express from "express";
import {
  addView,
  createPost,
  deletePost,
  getAllPost,
  getOwnPosts,
  search,
  singlePost,
  trandVideos,
  updatePost,
} from "../controllers/post.js";
import { checkAuth } from "../middlewares/userAuth.js";

const routes = express.Router();

routes.post("/create", checkAuth, createPost);
routes.put("/update/:id", checkAuth, updatePost);
routes.delete("/delete/:id", checkAuth, deletePost);
routes.get("/single/:id", singlePost);
routes.get("/own", checkAuth, getOwnPosts);
routes.get("/all", getAllPost);
routes.get("/trend", trandVideos);
routes.get("/view/:id", addView);
routes.get("/search", search);

export default routes;
