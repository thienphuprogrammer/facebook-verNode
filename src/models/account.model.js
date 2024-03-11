import {model, Schema} from "mongoose";

export const AccountDetailsSchema = new Schema(
    {
        lname: {type: String, required: true},
        fname: {type: String, required: true},
        age: {type: Number, required: true},
        email: {type: String, required: true},
        avatar: {type: String, required: true},
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

export const AccountSchema = new Schema(
    {
        username: {type: String, required: true, unique: true, dropDups: true},
        password: {type: String, required: true},
        accountDetails: {type: AccountDetailsSchema, required: true},
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

export const AccountModel = model('account', AccountSchema);

