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
    const pipeline = [
      {
        $match: searchPayload,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: pageSize,
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          user: {
            $arrayElemAt: ["$user", 0],
          },
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },
      {
        $project: {
          "user._id": 0,
          "user.encryptedPassword": 0,
          "user.refreshToken": 0,
        },
      },
    ];
    const res = await PostModel.aggregate(pipeline);
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
    const res = await PostModel.findByIdAndUpdate(
      searchPayload,
      filterPayload,
      {
        new: true,
      }
    );
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (searchPayload) => {
  try {
    const res = await PostModel.findByIdAndDelete(searchPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};
