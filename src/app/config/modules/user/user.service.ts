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
  const result = await userModel.find(
    {},
    { orders: 0, password: 0, __v: 0, _id: 0 },
  );
  return result;
};
const getSingleUserFromDB = async (userId: number) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.findOne(
      { userId },
      { password: 0, orders: 0, __v: 0 },
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
const getAllOrderFromDB = async (userId: number) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.findOne({ userId }, { orders: 1 });
    return result;
  }
};
const getCalculateTotalPriceFromDB = async (userId: number) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.aggregate([
      {
        $unwind: '$orders',
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$orders.price', '$orders.quantity'] } },
        },
      },
    ]);
    return result;
  } else {
    throw new Error('User not found!');
  }
};
export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUser,
  createOrder,
  getAllOrderFromDB,
  getCalculateTotalPriceFromDB,
};
