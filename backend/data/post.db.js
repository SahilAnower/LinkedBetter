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
        $unwind: "$comments",
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $addFields: {
          userDetails: {
            $arrayElemAt: ["$userDetails", 0],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          content: {
            $first: "$content",
          },
          images: {
            $first: "$images",
          },
          likeCount: {
            $first: "$likeCount",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
          createdAt: {
            $first: "$createdAt",
          },
          comments: {
            $push: {
              _id: "$comments._id",
              content: "$comments.content",
              image: "$comments.image",
              userName: "$userDetails.name",
              userId: "$userDetails._id",
              updatedAt: "$comments.updatedAt",
              createdAt: "$comments.createdAt",
            },
          },
          userName: {
            $first: "$user.name",
          },
          userId: {
            $first: "$user._id",
          },
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
