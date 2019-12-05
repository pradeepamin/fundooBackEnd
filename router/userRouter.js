const userController=require('../controller/userController');
const express=require('express');
const router=express.Router();
const tokenRec=require('../middleware/token')
const userToken=require('../middleware/token');

const upload = require('../services/fileUploadServices')

var singleUpload = upload.single('image');

//Creating api for User Registration and Login
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/forgotPassword',userController.forgotPassword)
router.post('/resetPassword/:token',tokenRec.verify,userController.resetPassword)
router.post('/image-upload',userToken.userVerify, (req,res,next)=>{
     singleUpload(req, res, (err) => {
        console.log("req.file", req.file);
            const imageURL = req.file.location;
            console.log("hi",imageURL);
            req.imageURL=imageURL;
            next();
    });     
},userController.imageUpload);
module.exports = router