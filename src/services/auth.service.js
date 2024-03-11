const {AccountModel} = require("../models/account.model");
import bcrypt from "bcrypt";
import {OAuth2Client} from "google-auth-library";

const findById = async (id) => {
    const account = await AccountModel.findById(id);
    if (account) {
        return account;
    }
    return null;
}

const findByEmail = async (email) => {
    const account = await AccountModel.findOne({
        email
    });
    if (account) {
        return account;
    }
    return null;
}

const checkAuth = async ({email, password}) => {
    const account = await AccountModel.findOne({
        email
    });
    if (account && bcrypt.compareSync(password, account.password)) {
        return account;
    }
    return null;
}

const loginWithGoogle = async (credential) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    if (!email) {
        return null;
    }
    const account = await AccountModel.findOne({
        email
    });
    if (account) {
        return account;
    }
    const newAccount = new AccountModel({
        email,
        password: bcrypt.hashSync(email, 10)
    });
    await newAccount.save();
    return newAccount;
}


export const AuthService = {
    findById,
    findByEmail,
    checkAuth,
    loginWithGoogle
}