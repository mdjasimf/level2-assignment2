import { z } from 'zod';

const userNameShcema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'name must start with capital letter',
    }),
  lastName: z.string(),
});

const userAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
const userValidationSchema = z.object({
  userId: z.number(),
  userName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'name must start with capital letter',
    }),
  password: z.string().max(15).min(5),
  fullName: userNameShcema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressSchema,
});

export default userValidationSchema;
