import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/comment.js";

import { checkAuth } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/", checkAuth, addComment);
router.delete("/:id", checkAuth, deleteComment);
router.get("/:videoId", checkAuth, getComments);

export default router;
