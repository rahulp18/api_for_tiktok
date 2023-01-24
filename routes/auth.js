import express from "express";
import {
  loginWithEmail,
  loginWithPhone,
  registerUser,
  verifyOtp,
} from "../controllers/auth.js";

const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login/email", loginWithEmail);
routes.post("/login/phone", loginWithPhone);
routes.post("/verifyOtp", verifyOtp);

export default routes;
