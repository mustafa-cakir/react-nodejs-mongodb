import httpStatus from '../utils/httpStatus';

const errorHandler = (err, req, res) => {
    console.error(err.stack);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
};

export default errorHandler;
