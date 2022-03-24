import httpStatus from '../../utils/httpStatus';
import { UserModel } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../../config/env';

const createAccessToken = id =>
    jwt.sign({ id }, ENV.accessTokenSecret, {
        expiresIn: ENV.accessTokenExpiration,
    });
const createRefreshToken = id =>
    jwt.sign({ id }, ENV.refreshTokenSecret, {
        expiresIn: ENV.refreshTokenExpiration,
    });

// auth login
export const authLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'Email or password is missing!' });

    try {
        const user = await UserModel.findOne({ email: email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const accessToken = createAccessToken(user.id);
            const refreshToken = createRefreshToken(user.id);

            // Save refreshToken to current user
            user.refreshToken = refreshToken;
            await user.save();

            // Save refreshToken to current user's cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                maxAge: ENV.refreshTokenCookieMaxAgeMs,
            });
            return res.status(httpStatus.OK).json({
                accessToken,
            });
        } else {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: 'Auth failed!',
            });
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'ERROR',
            message: e.message,
        });
    }
};

export const authRefreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(httpStatus.UNAUTHORIZED);

    const user = await UserModel.findOne({ refreshToken });
    if (!user) return res.sendStatus(httpStatus.FORBIDDEN); //Forbidden
    // evaluate jwt
    jwt.verify(refreshToken, ENV.refreshTokenSecret, (err, decoded) => {
        if (err) return res.sendStatus(httpStatus.FORBIDDEN);
        const accessToken = createAccessToken(user.id);
        res.json({ accessToken });
    });
};
