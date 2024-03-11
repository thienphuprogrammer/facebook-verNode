import {AccountService} from '../services/account.service.js';
import jwt from "jsonwebtoken";


const createAccount = async ({ email, password }) => {
    const status = await AccountService.createAccount({ email, password });
    if (status) {
        return {
            success: true,
            message: 'Account created successfully'
        };
    }
    return {
        success: false,
        code: 400,
        message: 'Account already exists'
    };
}

const getAccountById = async (id) => {
    const account = await AccountService.findById(id);
    if (account) {
        return {
            success: true,
            ...generateTokenResponse(account)
        }
    }
    return {
        success: false,
        code: 400,
        message: 'Account not found'
    };
}

const getAllAccounts = async () => {
    const accounts = await AccountService.findAll();
    if (accounts) {
        return {
            success: true,
            ...generateTokenResponse(accounts)
        }
    }
    return {
        success: false,
        code: 400,
        message: 'No accounts found'
    };
}

const updateAccount = async (account) => {
    const status = await AccountService.update(account);
    if (status) {
        return {
            success: true,
            message: 'Account updated successfully'
        };
    }
    return {
        success: false,
        code: 400,
        message: 'Account not found'
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
    getAccountById,
    getAllAccounts,
    updateAccount
}