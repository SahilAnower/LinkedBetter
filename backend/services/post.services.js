import { findAllFollowerFollowings } from "../data/followerFollowing.db.js";
import { createPost, findAllPosts } from "../data/post.db.js";
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
