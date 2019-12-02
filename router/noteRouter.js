const noteController=require('../controller/noteController');
const noteVerify=require('../middleware/token')
const express=require('express');
const router=express.Router();


router.post('/addNote',noteVerify.userVerify,noteController.addNote);


module.exports=router

