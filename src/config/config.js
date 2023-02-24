require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudUploads = (file, folderSaveTo, saveFileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file, {
        resource_type: 'auto',
        overwrite: true,
        folder: folderSaveTo,
        public_id: saveFileName,
        transformation: [
          { width: 450 },
          { audio_codec: 'mp3', bit_rate: '24k' },
        ],
      })
      .then((result) =>
        resolve({
          url: result.url,
          id: result.public_id,
        })
      )
      .catch((error) => {
        reject(error);
      });
  });
};

const MONGO_URL = process.env.MONGO_URI || '';
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

module.exports = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  cloudUploads,
};
