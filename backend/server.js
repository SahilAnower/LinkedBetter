import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import { connectDB } from "./config/db.config.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/auth", authRoutes);

app.use(authenticate);

// non - auth routes

app.use("/api/posts", postRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5060;

app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on port ${port}`);
});
