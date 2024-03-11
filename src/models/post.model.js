import {model, Schema} from 'mongoose';

export const PostSchema = new Schema(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
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

export const PostModel = model('post', PostSchema);