import jwt from "jsonwebtoken";

export const generateToken = async (payload, timePeriod) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey, {
      expiresIn: timePeriod,
    });
    return token;
  } catch (error) {
    throw error;
  }
};
