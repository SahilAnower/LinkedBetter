import {
  getAllPostsService,
  postCreateService,
} from "../services/post.services.js";

export const postCreate = async (req, res, next) => {
  try {
    req.body.user = req.userId;
    const response = await postCreateService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const postGetAll = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const payload = {
      user: req.userId,
      page,
      pageSize,
    };
    const response = await getAllPostsService(payload);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
