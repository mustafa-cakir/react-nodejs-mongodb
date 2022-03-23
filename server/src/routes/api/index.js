import express from 'express';
import { userRoutes } from '../../module/user/user.routes';

const apiRoutes = express.Router();

apiRoutes.get('/', function (req, res) {
    res.json({ message: 'this is /api base' });
});

apiRoutes.use('/user', userRoutes);

export default apiRoutes;
