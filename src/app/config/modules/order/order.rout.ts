import express from 'express';
const router = express.Router();

router.post('/users/:userId/orders', userControllers.createUser);
export const UserRoutes = router;
