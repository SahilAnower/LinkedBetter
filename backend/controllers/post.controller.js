import { postCreateService } from "../services/post.services.js";

export const postCreate = async (req, res, next) => {
  try {
    req.body.user = req.userId;
    const response = await postCreateService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
