import { z } from 'zod';

const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export default orderValidationSchema;
