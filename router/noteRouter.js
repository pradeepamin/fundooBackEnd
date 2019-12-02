const noteController=require('../controller/noteController');
const express=require('express');
const router=express.Router();


router.post('/addNote',noteController.addNote);



module.exports=router

