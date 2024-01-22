import express from "express";
import { postCreate } from "../controllers/post.controller.js";

const router = express.Router();

// get all posts from people whom I have followed
router.get("/");

// create a new post
router.post("/", postCreate);

// get a post by id
router.get("/:id");

// update a post by id
router.put("/:id");

// delete a post by id
router.delete("/:id");

export default router;
