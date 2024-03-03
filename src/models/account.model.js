import {model, Schema} from "mongoose";

export const AccountSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true, dropDups: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, required: true, default: false},
        address: {type: String, required: true},
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

