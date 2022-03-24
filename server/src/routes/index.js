import express from 'express';
import { authRoutes } from '../module/auth/auth.routes';
import { userRoutes } from '../module/user/user.routes';
import httpStatus from '../utils/httpStatus';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(httpStatus.BAD_REQUEST).json({ message: 'This is /api base' });
});

routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);

export default routes;
