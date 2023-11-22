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
  isActive: 'active' | 'blocked';
  hobbies: 'cricket' | 'football' | 'gardening';
  address: Address;
};
