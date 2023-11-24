import { Request, Response } from 'express';
import orderValidationSchema from './order.Validation';
import { orderServices } from './order.service';
const createOrders = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const zodOrderValidData = orderValidationSchema.parse(orderData);

    const result = await orderServices.createOrderIntoDB(zodOrderValidData);
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
export const orderControllers = {
  createOrders,
};
