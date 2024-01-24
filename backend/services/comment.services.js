import {
  createComment,
  deleteComment,
  findComment,
  updateComment,
} from "../data/comment.db.js";
import { CustomError } from "../models/CustomError.js";
import { isPostExists } from "./post.services.js";

export const commentCreateService = async (payload) => {
  try {
    if (!payload.content || !payload.user || !payload.post) {
      throw new CustomError(
        "Content, userId and postId are required fields.",
        400
      );
    }
    const isPost = await isPostExists(payload?.post);
    // console.log(isPost);
    if (!isPost) {
      //   console.log("here");
      throw new CustomError(
        "Post not found with this id: " + payload?.post,
        404
      );
    }
    const commentSaved = await createComment(payload);
    return commentSaved;
  } catch (error) {
    throw error;
  }
};

export const commentUpdateService = async (id, updatePayload) => {
  try {
    const { user } = updatePayload;
    if (!user || !id) {
      throw new CustomError("userId and commentId are required fields.", 400);
    }
    const savedComment = await findComment({ _id: id });
    if (!savedComment) {
      throw new CustomError("Comment not found with this id.", 404);
    }
    if (savedComment?.user.toString() !== user) {
      throw new CustomError(
        "You are not authorized to edit this comment.",
        401
      );
    }
    const updatedComment = await updateComment({ _id: id }, updatePayload);
    return updatedComment;
  } catch (error) {
    throw error;
  }
};

export const deleteCommentService = async (id, userId) => {
  try {
    if (!userId || !id) {
      throw new CustomError("userId and commentId are required fields.", 400);
    }
    const savedComment = await findComment({ _id: id });
    if (!savedComment) {
      throw new CustomError("Comment not found with this id.", 404);
    }
    if (savedComment?.user.toString() !== userId) {
      throw new CustomError(
        "You are not authorized to delete this comment.",
        401
      );
    }
    await deleteComment({ _id: id });
    return {
      success: true,
      message: "Comment with id: " + id + " was successfully deleted",
    };
  } catch (error) {
    throw error;
  }
};
