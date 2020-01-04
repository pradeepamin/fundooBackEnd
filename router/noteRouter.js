const noteController=require('../controller/noteController');
const elasticController=require('../controller/elasticController')
const elasticSearch=require('../helper/elasticSearch')
const noteVerify=require('../helper/token')
const express=require('express');
const router=express.Router();

router.post('/addNote',noteVerify.userVerify,noteController.addNote);
router.get('/getAllNote',noteVerify.userVerify,noteController.getAllNote);
router.put('/deleteNote',noteVerify.userVerify,noteController.deleteNote);
router.put('/updateNote',noteVerify.userVerify,noteController.updateNote);
router.get('/getDeleteNote',noteVerify.userVerify,noteController.getDeleteNote)
router.put('/unDeleteNote',noteVerify.userVerify,noteController.unDeleteNote);

router.post('/addCollaborator',noteVerify.userVerify,noteController.addCollaborator);
router.get('/getCollaborator',noteVerify.userVerify,noteController.getCollaborator);
router.delete('/deleteCollaborator',noteVerify.userVerify,noteController.deleteCollaborator)

router.put('/archiveNote',noteVerify.userVerify,noteController.archiveNote);
router.put('/unarchiveNote',noteVerify.userVerify,noteController.unarchiveNote)
router.get('/getArchiveNote',noteVerify.userVerify,noteController.getArchiveNote)

router.post('/addReminder',noteVerify.userVerify,noteController.addReminder)
router.put('/deleteReminder',noteVerify.userVerify,noteController.deleteReminder)

router.post('/createIndex',noteVerify.userVerify,elasticController.createIndex)    
router.post('/elasticSearch',noteVerify.userVerify,elasticController.elasticSearch)

router.post('/createLabel',noteVerify.userVerify,noteController.createLabel)
router.put('/updateLabel',noteVerify.userVerify,noteController.updateLabel)
router.get('/getAllLabel',noteVerify.userVerify,noteController.getAllLabel)
router.delete('/deleteLabel',noteVerify.userVerify,noteController.deleteLabel)

router.put('/noteLabel',noteVerify.userVerify,noteController.noteLabel)
router.put('/noteLabelUndo',noteVerify.userVerify,noteController.noteLabelUndo)

router.post('/noteColor',noteVerify.userVerify,noteController.noteColor)

router.post('/popEx',noteVerify.userVerify,noteController.popEx)
router.get('/popEx1',noteVerify.userVerify,noteController.popEx1)


module.exports=router;

