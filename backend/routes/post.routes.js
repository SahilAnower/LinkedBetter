import express from "express";
import {
  postCreate,
  postDelete,
  postGetAll,
  postUpdate,
} from "../controllers/post.controller.js";

const router = express.Router();

// get all posts from people whom I have followed
router.get("/", postGetAll);

// create a new post
router.post("/", postCreate);

// get a post by id
// router.get("/:id");

// update a post by id
router.put("/:id", postUpdate);

// delete a post by id
router.delete("/:id", postDelete);

export default router;
