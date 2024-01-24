import {
  commentCreateService,
  commentUpdateService,
  deleteCommentService,
} from "../services/comment.services.js";

export const commentCreate = async (req, res, next) => {
  try {
    req.body.user = req.userId;
    req.body.post = req.params.postId;
    const response = await commentCreateService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const commentUpdate = async (req, res, next) => {
  try {
    const updatePayload = {
      ...req.body,
      user: req.userId,
    };
    const response = await commentUpdateService(req.params.id, updatePayload);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const commentDelete = async (req, res, next) => {
  try {
    const response = await deleteCommentService(req.params.id, req.userId);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
