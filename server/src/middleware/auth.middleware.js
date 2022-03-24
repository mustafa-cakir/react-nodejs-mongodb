import jwt from 'jsonwebtoken';
import ENV from '../config/env';
import httpStatus from '../utils/httpStatus';
// import { UserModel } from '../module/user/user.model';

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(httpStatus.UNAUTHORIZED).send({
            status: 'ERROR',
            message: 'Auth-Token not set in header',
        });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        ENV.accessTokenSecret,
        (err, decoded) => {
            if (err) {
                //invalid token
                return res.status(httpStatus.FORBIDDEN).send({
                    status: 'ERROR',
                    message: 'Auth-Token is not valid',
                });
            }
            req.id = decoded.id;
            // req.roles = decoded.UserInfo.roles;
            next();
        },
        undefined,
    );
};

export default auth;
