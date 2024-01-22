import { createUser, findUser, updateUser } from "../data/auth.db.js";
import { CustomError } from "../models/CustomError.js";
import bcrypt from "bcrypt";
import { generateToken } from "./jwt.services.js";

const accessTokenExpiryTime = 1 * 60 * 60; // 1 hour * 60 minutes * 60 seconds
const refreshTokenExpiryTime = 24 * 60 * 60; // 24 hours * 60 minutes * 60 seconds

export const userSignupService = async (payload) => {
  try {
    const { name, email, password } = payload;
    if (!name || !email || !password) {
      throw new CustomError(
        "Name, email, and password are required fields.",
        400
      );
    }
    const foundUser = await findUser({
      email: email,
    });
    if (foundUser) {
      throw new CustomError("User already exists.", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await createUser({
      name: name,
      email: email,
      encryptedPassword: hashedPassword,
    });
    const userId = savedUser?._id;
    const accessToken = await generateToken(
      {
        userId: userId,
      },
      accessTokenExpiryTime
    );
    const refreshToken = await generateToken(
      {
        userId: userId,
      },
      refreshTokenExpiryTime
    );
    await updateUser({ _id: userId }, { refreshToken: refreshToken });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

export const userSigninService = async (payload) => {
  try {
    const { email, password } = payload;
    if (!email || !password) {
      throw new CustomError("Email, and password are required fields.", 400);
    }
    const foundUser = await findUser({
      email: email,
    });
    if (!foundUser) {
      throw new CustomError("User not found.", 404);
    }
    const isMatch = await bcrypt.compare(password, foundUser.encryptedPassword);
    if (!isMatch) {
      throw new CustomError("Invalid password.", 401);
    }
    const userId = foundUser?._id;
    const accessToken = await generateToken(
      {
        userId: userId,
      },
      accessTokenExpiryTime
    );
    const refreshToken = await generateToken(
      {
        userId: userId,
      },
      refreshTokenExpiryTime
    );
    await updateUser({ _id: userId }, { refreshToken: refreshToken });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

export const refreshAccessTokenService = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new CustomError("Refresh token is required.", 400);
    }
    const foundUser = await findUser({ refreshToken: refreshToken });
    if (!foundUser) {
      throw new CustomError("User not found.", 404);
    }
    const userId = foundUser?._id;
    const accessToken = await generateToken(
      {
        userId: userId,
      },
      accessTokenExpiryTime
    );
    return {
      accessToken,
      refreshToken: foundUser?.refreshToken,
    };
  } catch (error) {
    throw error;
  }
};
