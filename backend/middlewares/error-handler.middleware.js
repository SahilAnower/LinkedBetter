import { CustomError } from "../models/CustomError.js";

export const errorHandler = async (err, req, res, next) => {
  try {
    if (err instanceof CustomError) {
      return res.status(err?.errorCode).json(err);
    } else {
      const customError = new CustomError(err.message || "Unknown Error", 500);
      customError.originalError = err;
      return res.status(customError?.errorCode).json(customError);
    }
  } catch (error) {}
};
