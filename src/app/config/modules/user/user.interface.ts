import { Model } from 'mongoose';

export type fullName = {
  firstName: string;
  lastName: string;
};
export type Address = {
  street: string;
  city: string;
  country: string;
};

export type IUser = {
  userId: number;
  userName: string;
  password: string;
  fullName: fullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: 'cricket' | 'football';
  address: Address;
};

export interface UserModels extends Model<IUser> {
  isUserExists(userId: number): Promise<IUser | null>;
}
