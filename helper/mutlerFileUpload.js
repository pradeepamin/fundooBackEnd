/********************************************************************************
 * @Purpose     : AWS S3, used for object storage through a web service interface  
 * @description : function used to store images in AWS
 * @overview    : AWS S3#
*********************************************************************************/

require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const Bucket = process.env.BUCKET_NAME;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  Bucket: Bucket,
  // region: 'ap-south-1'
})
const s3 = new AWS.S3();

const fileFilter = (req, file, cb) => {
  console.log("REQQ in multer--",req);
  

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      console.log("in error");
      cb('Invalid file type, only JPEG and PNG is allowed!');
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: Bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      console.log("req in multer", file);
      cb(null, { fieldName: 'Profile' });
    },
    key: (req, file, cb) => {
      // cb(null, file.originalname)
      cb(null, file.originalname);
      
    }
  })
})
module.exports = upload;