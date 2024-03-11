import {AccountModel} from "../models/account.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const PASSWORD_HASH_SALT_ROUNDS = 10;

const createAccount = async ({email, password}) => {
    const existingAccount = await Account
        .findOne({email});
    if (existingAccount) {
        return false;
    }
    const account = new AccountModel({
        email,
        password: await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS),
    });
    await account.save().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
    return true;
}

const findById = async (id) => {
    const account = await AccountModel.findById(id);
    if (account) {
        return account;
    }
    return null;
}

const findAll = async () => {
    const accounts = await AccountModel.find();
    if (accounts) {
        return accounts;
    }
    return null;
}

const update = async (account) => {
    const {id, ...rest} = account;
    const status = await AccountModel.updateOne
        ({_id: id}, rest);
    return !!status;

}

export const AccountService = {
    createAccount,
    findById,
    findAll,
    update
}