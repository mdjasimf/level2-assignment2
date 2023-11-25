import { IUser } from './user.interface';
import { userModel } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  if (await userModel.isUserExists(userData.userId)) {
    throw new Error('user allready exists');
  }
  const result = await userModel.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await userModel.find();
  return result;
};
const getSingleUserFromDB = async (userId: number) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.findOne(
      { userId },
      // { new: true, projection: { password: 0 } },
    );
    return result;
  }
};
const deleteUserFromDB = async (userId: number) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.deleteOne({ userId });
    return result;
  }
};
const updateUser = async (userId: number, user: IUser) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.findOneAndUpdate(
      { userId: userId },
      { $set: user },
      { new: true, projection: { password: 0 } },
    );
    return result;
  }
};
const createOrder = async (userId: number, user: IUser) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.findOneAndUpdate(
      { userId: userId },
      { $push: { orders: user } },
      { new: true, projection: { password: 0 } },
    );
    return result;
  }
};
const getAllOrderFromDB = async () => {
  const result = await userModel.find();
  return result;
};
export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUser,
  createOrder,
  getAllOrderFromDB,
};
