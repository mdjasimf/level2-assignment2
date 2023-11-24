import { IOrders } from './order.interface';
import { orderModel } from './order.model';

const createOrderIntoDB = async (orderData: IOrders) => {
  const result = await orderModel.create(orderData);
  return result;
};

export const orderServices = {
  createOrderIntoDB,
};
