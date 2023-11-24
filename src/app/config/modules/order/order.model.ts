import { Schema, model } from 'mongoose';
import { IOrders } from './order.interface';

const orderSchema = new Schema<IOrders>({
  productName: {
    type: String,
    required: [true, 'user Name is require'],
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    trim: true,
  },
});
export const orderModel = model<IOrders>('User', orderSchema);
