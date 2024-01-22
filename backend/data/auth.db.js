import UserModel from "../models/User.js";

export const createUser = async (payload) => {
  try {
    const res = await UserModel.create(payload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const findUser = async (searchPayload, filterPayload = null) => {
  try {
    const res = await UserModel.findOne(searchPayload, filterPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (searchPayload, filterPayload) => {
  try {
    const res = await UserModel.updateOne(searchPayload, filterPayload, {
      new: true,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};
