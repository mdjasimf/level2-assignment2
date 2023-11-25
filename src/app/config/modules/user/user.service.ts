import { IUser } from './user.interface';
import { userModel } from './user.model';

//user create section....
const createUserIntoDB = async (userData: IUser) => {
  if (await userModel.isUserExists(userData.userId)) {
    throw new Error('user allready exists');
  }
  const result = await userModel.create(userData);
  return result;
};
//get all user section...........
const getAllUserFromDB = async () => {
  const result = await userModel.find(
    {},
    { orders: 0, password: 0, __v: 0, _id: 0 },
  );
  return result;
};

//get single user section...................
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
//delete user section...........
const deleteUserFromDB = async (userId: number) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.deleteOne({ userId });
    return result;
  }
};

//update user Selection...........
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
//create order section..................
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
//get all order section.................
const getAllOrderFromDB = async (userId: number) => {
  if (await userModel.isUserExists(userId)) {
    const result = await userModel.findOne({ userId }, { orders: 1 });
    return result;
  }
};
//calculate total order section...............
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
