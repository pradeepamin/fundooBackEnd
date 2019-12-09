const userController=require('../controller/userController');
const express=require('express');
const router=express.Router();
const tokenRec = require('../helper/token')
const userToken=require('../helper/token');
const upload = require('../helper/mutlerFileUpload')


//Creating api for User Registration and Login
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/forgotPassword',userController.forgotPassword)
router.post('/resetPassword/:token',tokenRec.verify,userController.resetPassword)
router.post('/imageUpload',userToken.userVerify,upload.single('image'),userController.imageUpload)


module.exports = router