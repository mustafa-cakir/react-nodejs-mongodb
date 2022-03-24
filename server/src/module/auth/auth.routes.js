import express from 'express';
import { asyncWrapper } from '../../utils/asyncWrapper';
import { authLogin, authRefreshToken } from './auth.controller';
import routes from '../../routes';
import httpStatus from '../../utils/httpStatus';

const authRoutes = express.Router();

authRoutes.get('/', (req, res) => {
    res.status(httpStatus.BAD_REQUEST).json({ message: 'This is /api/auth base' });
});

authRoutes.post('/login', asyncWrapper(authLogin));
authRoutes.get('/refresh', asyncWrapper(authRefreshToken));

export { authRoutes };
