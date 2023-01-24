import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comment.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection established");
  } catch (error) {
    console.log(error);
  }
};

const StartServer = () => {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

// Routes hablder
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

StartServer();
