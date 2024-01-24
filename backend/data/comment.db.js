import CommentModel from "../models/Comment.js";

export const createComment = async (payload) => {
  try {
    const res = await CommentModel.create(payload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const findAllComments = async (searchPayload, filterPayload = null) => {
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
        $project: {
          userName: "$user.name",
          userId: "$user._id",
          content: 1,
          image: 1,
          likeCount: 1,
        },
      },
    ];
    const res = await CommentModel.aggregate(pipeline);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const findComment = async (searchPayload, filterPayload = null) => {
  try {
    const res = await CommentModel.findOne(searchPayload, filterPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const updateComment = async (searchPayload, filterPayload) => {
  try {
    const res = await CommentModel.findByIdAndUpdate(
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

export const deleteComment = async (searchPayload) => {
  try {
    const res = await CommentModel.findByIdAndDelete(searchPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};
