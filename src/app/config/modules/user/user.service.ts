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
  const result = await userModel.findOne({ userId });
  return result;
};
const deleteUserFromDB = async (userId: number) => {
  const result = await userModel.deleteOne({ userId });
  return result;
};
const updateUser = async (
  userId: number,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await userModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUser,
};
