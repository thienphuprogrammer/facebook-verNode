import bcrypt from 'bcrypt';
import { AccountModel } from '../models/account.model.js';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import jwt from "jsonwebtoken";

const PASSWORD_HASH_SALT_ROUNDS = 10;

const createAccount = async ({ email, password }) => {
    const user = await AccountModel
        .findOne({ email });
    if (user) {
        return {
            success: false,
            code: BAD_REQUEST,
            message: 'User already exists',
        };
    }
    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS);
    const newUser = await AccountModel.create({
        email: email.toLowerCase(),
        password: hashedPassword,
    });
    return {
        success: true,
        ...generateTokenResponse(newUser),
    };
}

const loginWithUsernameAndPassword = async ({ email, password }) => {
    const user = await AccountModel
        .findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        return {
            success: true,
            ...generateTokenResponse(user),
        };
    }
    return {
        success: false,
        code: BAD_REQUEST,
        message: 'Invalid email or password',
    };
}

const generateTokenResponse = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    return {
        _id: user._id,
        email: user.email,
        token,
    };
}

module.exports = {
    createAccount,
    loginWithUsernameAndPassword
}