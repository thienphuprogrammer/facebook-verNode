const {LocalFileModel} = require('../models/local-file.model');
import * as multer from "multer";
import * as fs from "fs";

// Create a storage object for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const create = async (file) => {
    const newFile = new LocalFileModel({
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        url: file.path
    });
    return await newFile.save();
}

const findById = async (id) => {
    return LocalFileModel.findById(id);

}

export const FileService = {
    create,
    findById,
    upload: multer({storage})
}