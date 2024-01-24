import { findAllFollowerFollowings } from "../data/followerFollowing.db.js";
import {
  createPost,
  deletePost,
  findAllPosts,
  findPost,
  updatePost,
} from "../data/post.db.js";
import { CustomError } from "../models/CustomError.js";
import mongoose from "mongoose";

export const postCreateService = async (payload) => {
  try {
    if (!payload.content || !payload.user) {
      throw new CustomError("Content and userId are required fields.", 400);
    }
    const savedPost = await createPost(payload);
    return savedPost;
  } catch (error) {
    throw error;
  }
};

export const getAllPostsService = async (searchPayload) => {
  try {
    let { user, page, pageSize } = searchPayload;
    if (!user) {
      throw new CustomError("userId is required field.", 400);
    }
    if (!page || page <= 0) {
      page = 1;
    }
    if (!pageSize || pageSize <= 0) {
      pageSize = 10;
    }
    let followingLists = await findAllFollowerFollowings(
      {
        follower: user,
      },
      {
        following: 1,
      }
    );
    followingLists = followingLists.map(
      (following) => new mongoose.Types.ObjectId(following.following())
    );
    followingLists.push(new mongoose.Types.ObjectId(user));
    const posts = await findAllPosts(
      {
        user: {
          $in: followingLists,
        },
      },
      {
        page,
        pageSize,
      }
    );
    return posts;
  } catch (error) {
    throw error;
  }
};

export const updatePostService = async (id, updatePayload) => {
  try {
    const { user } = updatePayload;
    if (!user || !id) {
      throw new CustomError("userId and postId are required fields.", 400);
    }
    const savedPost = await findPost({ _id: id });
    if (!savedPost) {
      throw new CustomError("Post not found with this id.", 404);
    }
    if (savedPost?.user.toString() !== user) {
      throw new CustomError("You are not authorized to edit this post.", 401);
    }
    const updatedPost = await updatePost({ _id: id }, updatePayload);
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

export const deletePostService = async (id, userId) => {
  try {
    if (!userId || !id) {
      throw new CustomError("userId and postId are required fields.", 400);
    }
    const savedPost = await findPost({ _id: id });
    if (!savedPost) {
      throw new CustomError("Post not found with this id.", 404);
    }
    if (savedPost?.user.toString() !== userId) {
      throw new CustomError("You are not authorized to delete this post.", 401);
    }
    await deletePost({ _id: id });
    return {
      success: true,
      message: "Post with id: " + id + " was successfully deleted",
    };
  } catch (error) {
    throw error;
  }
};
