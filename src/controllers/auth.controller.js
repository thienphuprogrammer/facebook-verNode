const {AuthService} = require('../services/auth.service');
const jwt = require("jsonwebtoken");
import {
    BAD_REQUEST
} from "../constants/httpStatus";

const getProfile = async (id) => {
    const account = await AuthService.findById(id);
    if (account) {
        return {
            success: true,
            ...generateTokenResponse(account)
        }
    }
    return {
        success: false,
        code: BAD_REQUEST,
        message: 'Account not found'
    };
}

const loginWithUsernameAndPassword = async ({ email, password }) => {
    const account = await AuthService.checkAuth({ email, password });
    if (account) {
        return {
            success: true,
            ...generateTokenResponse(account)
        }
    }
    return {
        success: false,
        code: BAD_REQUEST,
        message: 'Invalid email or password'
    };
}

const loginWithGoogle = async (credential) => {
    const status = await AuthService.loginWithGoogle(credential);
    if (status) {
        return {
            success: true,
            message: 'Account created successfully'
        };
    }
    return {
        success: false,
        code: BAD_REQUEST,
        message: 'Account already exists'
    };
}


const generateTokenResponse = (user) => {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
    };
}

module.exports = {
    getProfile,
    loginWithUsernameAndPassword,
    loginWithGoogle
}


