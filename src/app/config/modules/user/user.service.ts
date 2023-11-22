import { IUser } from './user.interface';
import { userModel } from './user.model';

const createUserIntoDB = async (user: IUser) => {
  const result = await userModel.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await userModel.find();
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
