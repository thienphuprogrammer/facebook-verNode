import {model, Schema} from "mongoose";

export const FileSchema = new Schema(
    {
        name: {type: String, required: true},
        size: {type: Number, required: true},
        type: {type: String, required: true},
        url: {type: String, required: true},
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

export const LocalFileModel = model('file', FileSchema);