import {model} from "mongoose";

const { FileService } = require('../services/local-file.service');
import {
    BAD_REQUEST
} from "../constants/httpStatus";

const uploadFile = async (file, req) => {
    const info  = await FileService.create(
        file.name,
        file.path,
    );
    const url = `${req.protocol}://${req.get('host')}/local-files/${info._id}`;
    return {
        success: true,
        message: 'File uploaded successfully',
        data: {
            url
        }
    };
}

const retrieve = async (id) => {
    const file = await FileService.findById(id);
    if (file) {
        return {
            success: true,
            data: file
        };
    }
    return {
        success: false,
        code: BAD_REQUEST,
        message: 'File not found'
    };
}

module.exports = {
    uploadFile,
    retrieve
}
