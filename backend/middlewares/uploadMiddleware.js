import fileUpload from 'express-fileupload';

const uploadMiddleware = fileUpload({
    createParentPath: true, // Automatically create directory if it doesn't exist
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max file size
    abortOnLimit: true, // Abort request if file size limit is reached
    responseOnLimit: 'File size limit has been reached', // Custom response message
});

export default uploadMiddleware;