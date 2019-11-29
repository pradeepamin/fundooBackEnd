const userController=require('../controller/userController');
const express=require('express');
const router=express.Router();

//Creating api for User Registration and Login
console.log("In router")
router.post('/register',userController.register)
console.log("In route close")

// router.post('/login',userController.login)
// router.post('/forgotPassword',userController.forgotPassword)
// router.post('/resetPassword',userController.resetPassword)



module.exports=router