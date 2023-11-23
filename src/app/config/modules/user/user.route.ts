import express from 'express';
import { userControllers } from './user.controller';
const router = express.Router();

router.post('/users', userControllers.createUser);
router.get('/users', userControllers.getAllusers);
router.get('/users/:userId', userControllers.getSingleUser);
router.delete('/users/:userId', userControllers.deleteUser);
router.patch('/users/:userId', userControllers.updateUser);
export const UserRoutes = router;
