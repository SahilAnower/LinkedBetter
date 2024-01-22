import { findAllFollowerFollowings } from "../data/followerFollowing.db.js";
import { createPost, findAllPosts } from "../data/post.db.js";

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
    const { user, page, pageSize } = searchPayload;
    if (!user) {
      throw new CustomError("userId is required field.", 400);
    }
    if (!page || page <= 0) {
      page = 1;
    }
    if (!pageSize || pageSize <= 0) {
      pageSize = 10;
    }
    // todo: get all followings list
    let followingLists = await findAllFollowerFollowings(
      {
        follower: user,
      },
      {
        following: 1,
      }
    );
    followingLists = followingLists.map((following) => following.following);
    followingLists.push(user);
    // todo: get all posts of followings + mine
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
    // todo: populate all comments of posts
    // for (const post of posts) {
    //     post.comments = await
    // }
    return posts;
  } catch (error) {
    throw error;
  }
};
