const noteController=require('../controller/noteController');
const elasticSearch=require('../helper/elasticSearch')
const noteVerify=require('../helper/token')
const express=require('express');
const router=express.Router();

router.post('/addNote',noteVerify.userVerify,noteController.addNote);
router.get('/getAllNote',noteVerify.userVerify,noteController.getAllNote);
router.put('/deleteNote',noteVerify.userVerify,noteController.deleteNote);
router.put('/updateNote',noteVerify.userVerify,noteController.updateNote);

router.post('/addCollaborator',noteVerify.userVerify,noteController.addCollaborator);
router.get('/getCollaborator',noteVerify.userVerify,noteController.getCollaborator);
router.delete('/deleteCollaborator',noteVerify.userVerify,noteController.deleteCollaborator)

router.put('/archiveNote',noteVerify.userVerify,noteController.archiveNote);
router.put('/unarchiveNote',noteVerify.userVerify,noteController.unarchiveNote)

router.post('/addReminder',noteVerify.userVerify,noteController.addReminder)
router.put('/deleteReminder',noteVerify.userVerify,noteController.deleteReminder)

router.post('/createIndex',noteVerify.userVerify,elasticSearch.createIndex)    


module.exports=router;

