import mongoose, { Schema, model } from 'mongoose';
import { Address, IUser, Order, UserModels, fullName } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../..';

const userFullNameSchema = new Schema<fullName>({
  firstName: {
    type: String,
    require: [true, 'firstName is require'],
    trim: true,
    minlength: [3, 'first Name is required at least 3'],
    validate: {
      validator: function (value: string) {
        const firstName = value.charAt(0).toUpperCase() + value.slice(1);
        return firstName === value;
      },
      message: '{VALUE} is not capitalize formate',
    },
  },
  lastName: {
    type: String,
    required: [true, 'last Name is require'],
    trim: true,
    minlength: [3, 'last Name is required at least 3'],
  },
});
const userAddressSchema = new Schema<Address>({
  street: { type: String, trim: true, required: [true, 'street is require'] },
  city: { type: String, trim: true, required: [true, 'city is require'] },
  country: { type: String, required: [true, 'country is require'] },
});

const orderSchema = new Schema<Order>({
  productName: { type: String, required: [true, 'last Name is require'] },
  price: { type: Number, required: [true, 'age is require'] },
  quantity: { type: Number, required: [true, 'age is require'] },
});

const userSchema = new Schema<IUser, UserModels>({
  userId: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'user Name is require'],
    trim: true,
    minlength: [3, 'user Name is required at least 3'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password is require'],
  },
  fullName: userFullNameSchema,
  age: {
    type: Number,
    trim: true,
    required: [true, 'age is require'],
  },
  email: { type: String, required: [true, 'email is require'], unique: true },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: { type: [String], enum: ['cricket', 'football'], required: true },
  address: userAddressSchema,
  orders: [orderSchema],
});

//here is bcrypt(pasword hash)..................
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.pre('find', function (next) {
  next();
});

//here is statics method............
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await userModel.findOne({ userId });
  return existingUser;
};

export const userModel = model<IUser, UserModels>('User', userSchema);
