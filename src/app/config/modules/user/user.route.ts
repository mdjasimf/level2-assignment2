import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

router.post('/users', userControllers.createUser);
router.get('/users', userControllers.getAllusers);
router.get('/users/:userId', userControllers.getSingleUser);
router.delete('/users/:userId', userControllers.deleteUser);
router.put('/users/:userId', userControllers.updateUser);
router.put('/users/:userId/orders', userControllers.createOrder);
router.get('/users/:userId/orders', userControllers.getAllorder);
export const UserRoutes = router;
