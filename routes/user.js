import express from "express";
import {
  dislike,
  getInfo,
  getSingleUser,
  like,
  updatePicture,
  updateProfile,
} from "../controllers/user.js";
import { checkAuth } from "../middlewares/userAuth.js";

const routes = express.Router();

routes.put("/updateProfilePicture", checkAuth, updatePicture);
routes.put("/updateProfile", checkAuth, updateProfile);
routes.get("/info", checkAuth, getInfo);
routes.get("/:id", getSingleUser);
// like video
routes.put("/like/:videoId", checkAuth, like);
// Dislikevideo
routes.put("/dislike/:videoId", checkAuth, dislike);

export default routes;
