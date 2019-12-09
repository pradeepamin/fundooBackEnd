const noteController=require('../controller/noteController');
const noteVerify=require('../helper/token')
const express=require('express');
const router=express.Router();


router.post('/addNote',noteVerify.userVerify,noteController.addNote);
router.get('/getAllNote',noteVerify.userVerify,noteController.getAllNote);
router.put('/deleteNote',noteVerify.userVerify,noteController.deleteNote);
router.put('/updateNote',noteVerify.userVerify,noteController.updateNote);

router.post('/addCollaborator',noteVerify.userVerify,noteController.addCollaborator);

module.exports=router;

