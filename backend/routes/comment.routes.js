import express from "express";
import {
  commentCreate,
  commentDelete,
  commentUpdate,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:postId", commentCreate);

router.put("/:id", commentUpdate);

router.delete("/:id", commentDelete);

export default router;
