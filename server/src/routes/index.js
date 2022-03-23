import express from 'express';
import apiRoutes from './api';

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'World' });
});

router.use('/api', apiRoutes);

export default router;
