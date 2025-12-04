import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

import commentRoutes from "./routes/comment.routes.js";
app.use("/api/comments", commentRoutes);

import uploadTestRoutes from "./routes/uploadTest.routes.js";
app.use("/api/upload-test", uploadTestRoutes);

import postRoutes from "./routes/post.routes.js";
app.use("/api/posts", postRoutes);

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("LastPuff API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
