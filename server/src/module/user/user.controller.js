import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from './user.model';
import httpStatus from '../../utils/httpStatus';

// Create User
export const userRegister = async (req, res) => {
    try {
        const isExistingUser = await UserModel.findOne({ email: req.body.email });
        if (isExistingUser) {
            return res.status(httpStatus.CONFLICT).json({
                message: 'Mail Already Exists!',
            });
        } else {
            const user = new UserModel(req.body);
            if (req.body.password) {
                user.hash = await bcrypt.hashSync(req.body.password, 10);
            }
            user.password = user.hash;
            await user.save();
            return res.status(httpStatus.CREATED).json({ data: { user } });
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'ERROR',
            message: e.message,
        });
    }
};

// Get All Users
export const userFindAll = async (req, res) => {
    try {
        let users = await UserModel.find();
        return res.json(users);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
};

// Get User By ID
export const userFindOne = async (req, res) => {
    const { id } = req.params || {};
    try {
        let user = await UserModel.findById(id);
        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
};

// Update User By ID
export const userUpdate = async (req, res) => {
    const { id } = req.params || {};
    try {
        let user = await UserModel.findById(id);
        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: 'User not found' });
        }
        user = {
            ...user,
            ...req.body,
        };
        // Object.assign(user, req.body);
        await user.save();
        return res.json(user);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
};

// Delete User By ID
export const userDelete = async (req, res) => {
    const { id } = req.params || {};
    try {
        let user = await UserModel.findByIdAndRemove(id);
        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: 'User not found' });
        }
        return res.json({ message: 'User deleted successfully!' });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.toString() });
    }
};
