import express from 'express';
import { userDelete, userFindAll, userFindOne, userLogin, userRegister, userUpdate } from './user.controller';
import { asyncWrapper } from '../../utils/asyncWrapper';
import auth from '../../middleware/auth.middleware';
import httpStatus from '../../utils/httpStatus';

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
    res.status(httpStatus.BAD_REQUEST).json({ message: 'This is /api/user base' });
});

// Create
userRoutes.post('/register', asyncWrapper(userRegister));

// Login
userRoutes.post('/login', asyncWrapper(userLogin));

//GetAll Data
userRoutes.get('/users', auth, asyncWrapper(userFindAll));

//GetBy ID
userRoutes.get('/:userId', auth, asyncWrapper(userFindOne));

//update by ID
userRoutes.put('/:userId', auth, asyncWrapper(userUpdate));

//Delete
userRoutes.delete('/:userId', auth, asyncWrapper(userDelete));

export { userRoutes };
