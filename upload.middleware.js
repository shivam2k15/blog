const multer = require("multer"); // middleware for handling multipart/form-data
//parses the incoming file and makes it available as req.file or req.files

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/**
 * @function uploadMiddleware
 * @description Middleware function for handling file uploads to Cloudinary.
 *              Uses `multer` for parsing the incoming file and `CloudinaryStorage` for storing it on Cloudinary.
 * @returns {Object} Multer instance configured with Cloudinary storage and file size limits.
 */
const uploadMiddleware = () => {
  // Cloudinary storage configuration
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const folderPath = `public`; // Update the folder path here
      const publicId = `${Date.now()}_${file.originalname.split(".")[0]}`; //new file name to store in cloudinary
      // Generating unique file name by adding timestamp to avoid duplicates

      return {
        folder: folderPath,
        public_id: publicId,
      };
    },
  });

  // Return multer configuration with Cloudinary storage and size limits
  return multer({
    storage: storage,
    limits: {
      fileSize: 50 * 1024 * 1024, // keep images size < 50 MB
    },
  });
};

module.exports = uploadMiddleware;
