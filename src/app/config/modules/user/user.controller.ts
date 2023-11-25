import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodValidData = userValidationSchema.parse(userData);

    const result = await userServices.createUserIntoDB(zodValidData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const getAllusers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(userId);
    if (result) {
      res.json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserFromDB(userId);
    if (result.deletedCount === 1) {
      res.json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const userId = req.params.userId;
    const result = await userServices.updateUser(userId, user);
    if (result) {
      res.status(200).json({
        status: true,
        message: 'User updated successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const createOrder = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userId = req.params.userId;
    const result = await userServices.createOrder(userId, user);
    if (result) {
      res.status(200).json({
        status: true,
        message: 'User updated successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const getAllorder = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllOrderFromDB();
    res.status(200).json({
      success: true,
      message: 'order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
export const userControllers = {
  createUser,
  getAllusers,
  getSingleUser,
  deleteUser,
  updateUser,
  createOrder,
  getAllorder,
};
