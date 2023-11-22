import { Schema, model } from 'mongoose';
import { Address, IUser, fullName } from './user.interface';

const userFullNameSchema = new Schema<fullName>({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
});
const userAddressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true },
  userName: { type: String, require: true },
  password: { type: String, required: true },
  fullName: userFullNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: ['active', 'blocked'],
  hobbies: ['cricket', 'football', 'gardening'],
  address: userAddressSchema,
});

export const userModel = model<IUser>('User', userSchema);
