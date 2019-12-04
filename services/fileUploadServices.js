// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');


// aws.config.update({
//   secretAccessKey: process.env.secretAccessKey,
//   accessKeyId: process.env.accessKeyId,
//   region: process.env.region
// });

// const s3 = new aws.S3();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true)
//   } else {
//       cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
//   }
// }

// const upload = multer({
//   fileFilter,
//   storage: multerS3({
//     s3,
//     bucket: process.env.bucket,
//     acl: 'public-read',
//     metadata:  (req, file, cb)=> {
//       console.log("req in multer",req);
      
//       cb(null, {fieldName: 'TESTING_META_DATA!'});
//     },
//     key:  (req, file, cb)=> {
//       cb(null, Date.now().toString())
//     }
//   })
// })

// module.exports = upload;
require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;
var Bucket = process.env.BUCKET_NAME;

AWS.config.update({
    accessKeyId:accessKeyId,
    secretAccessKey: secretAccessKey,
    Bucket: Bucket
})
var s3=new AWS.S3();
var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: Bucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      ACL: 'public-read',
      metadata: function (req, file, cb) {
        console.log("req in multer",file);
        cb(null, {fieldName: 'Profile'});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })
  module.exports=upload;