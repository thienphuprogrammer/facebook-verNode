import {PostService} from "../services/post.service";
import {
    BAD_REQUEST,
    CREATED,
    OK
} from "../constants/httpStatus";


const createPost = async (post, accountId) => {
    const status = await PostService.create(post, accountId);
    return status ? {
        success: true,
        message: 'Post created successfully',
        data: status
    } : {
        success: false,
        code: BAD_REQUEST,
        message: 'Post not created'
    };
}

const fetchPosts = async (filter) => {
    const posts = await PostService.findAll(filter);
    return posts ? {
        success: true,
        data: posts
    } : {
        success: false,
        code: BAD_REQUEST,
        message: 'Posts not found'
    };
}

const updatePost = async (post, accountId) => {
    const status = await PostService.update(post, accountId);
    return status ? {
        success: true,
        message: 'Post updated successfully',
        data: status
    } : {
        success: false,
        code: BAD_REQUEST,
        message: 'Post not updated'
    };
}

module.exports = {
    createPost,
    fetchPosts,
    updatePost
}