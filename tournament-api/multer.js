const path = require('path');
const fs = require('fs');

const multer = require('multer');
const {nanoid} = require("nanoid");

const config = require('./config');

const tryToCreateDir = async dirName => {
    const dirPath = path.join(config.uploadPath, dirName);
    try {
        await fs.promises.access(dirPath)
    }catch (e) {
        await fs.promises.mkdir(dirPath)
    }
};

const createMulter = dirName => {
    const storage = multer.diskStorage({
        destination: async (req, file, cb) => {
            await tryToCreateDir(dirName);
            cb(null, config.uploadPath);
        },
        filename: (req, file, cb) => {
            const filename = path.join(dirName, nanoid() + path.extname(file.originalname));

            cb(null, filename);
        }
    });

    return multer({storage});
};

const uploads = createMulter('uploads');
const avatar = createMulter('avatar');

module.exports = {
    uploads,
    avatar
};