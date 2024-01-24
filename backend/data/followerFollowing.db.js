import FollowerFollowingModel from "../models/FollowerFollowing.js";

export const createFollowerFollowing = async (payload) => {
  try {
    const res = await FollowerFollowingModel.create(payload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const findAllFollowerFollowings = async (
  searchPayload,
  filterPayload = null
) => {
  try {
    const res = await FollowerFollowingModel.find(searchPayload, filterPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const findFollowerFollowing = async (
  searchPayload,
  filterPayload = null
) => {
  try {
    const res = await FollowerFollowingModel.findOne(
      searchPayload,
      filterPayload
    );
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const updateFollowerFollowing = async (searchPayload, filterPayload) => {
  try {
    const res = await FollowerFollowingModel.updateOne(
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

export const deleteFollowerFollowing = async (searchPayload) => {
  try {
    const res = await FollowerFollowingModel.deleteOne(searchPayload);
    if (res) {
      return res;
    }
  } catch (error) {
    throw error;
  }
};
