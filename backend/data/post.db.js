import PostModel from "../models/Post.js";

export const createPost = async (payload) => {
  try {
    const res = await PostModel.create(payload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const findAllPosts = async (searchPayload, filterPayload = null) => {
  try {
    const { page, pageSize } = filterPayload;
    const skip = (page - 1) * pageSize;
    const res = await PostModel.find(searchPayload, filterPayload)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(pageSize);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const findPost = async (searchPayload, filterPayload = null) => {
  try {
    const res = await PostModel.findOne(searchPayload, filterPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (searchPayload, filterPayload) => {
  try {
    const res = await PostModel.updateOne(searchPayload, filterPayload, {
      new: true,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (searchPayload) => {
  try {
    const res = await PostModel.deleteOne(searchPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};
