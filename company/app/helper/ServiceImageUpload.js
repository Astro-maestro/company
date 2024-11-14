const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

// Set up multer for image upload
const uploadServiceImages = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || 
            file.mimetype === 'image/jpeg' || file.mimetype === 'image/svg+xml') {
            cb(null, true);
        } else {
            cb(new Error('Only jpg, jpeg, png, and svg files are supported!'), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 4 // 2MB file size limit
    }
});

// Export the multer instance
module.exports = uploadServiceImages.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]);
