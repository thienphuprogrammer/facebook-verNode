import {PostModel} from "../models/post.model";

const create = async (post, accountId) => {
    const newPost = new PostModel({
        ...post,
        accountId
    });
    return await newPost.save();
}

const findAll = async (filter) => {
    return PostModel.find(filter);
}

const update = async (post, accountId) => {
    const status = await PostModel.updateOne({
        _id: post.id,
        accountId
    }, {
        ...post
    });
    return status.nModified > 0;
}

export const PostService = {
    create,
    findAll,
    update
}