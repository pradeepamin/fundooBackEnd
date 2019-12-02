const userController=require('../controller/userController');
const express=require('express');
const router=express.Router();
const tokenRec=require('../middleware/token')

//Creating api for User Registration and Login
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/forgotPassword',userController.forgotPassword)
router.post('/resetPassword/:token',tokenRec.verify,userController.resetPassword)

module.exports = router