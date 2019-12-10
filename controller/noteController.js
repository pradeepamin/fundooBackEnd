const noteService = require('../services/noteServices')




exports.addNote = (req, res) => {
    console.log("req.", req.body);

    req.checkBody('title', 'discription is invalid').notEmpty();
    req.checkBody('description', 'discription is invalid').notEmpty();
    var error = req.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response);
        console.log("error-register", error);
        console.log("Response", response)
    } else {
        console.log("Req body---->", req.body)
        noteService.addUser(req)
            .then((data) => {

                console.log("In conttoller");
                response.sucess = true;
                response.data = data
                res.status(200).send(response)
                console.log(response);

            })
            .catch((err) => {
                response.sucess = false;
                response.err = err
                res.status(404).send(response)
            })

    }
}

exports.getAllNote = (req, res) => {

    let response = {};
    noteService.getAllNote(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.sucess = false;
            response.data = err;
            res.status(404).send(response)
        })
}

exports.deleteNote = (req, res) => {
    req.checkBody('userId', 'user id is invalid').notEmpty();
    let error = req.validationErrors();
    let response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response)
    }
    noteService.deleteNote(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response);
        })
        .catch((err) => {
            response.sucess = false;
            response.data = err;
            res.status(500).send(response);
        })
}

exports.updateNote = (req, res) => {
    // req.checkBody('userId','user id is invalid').notEmpty();
    // req.checkBody('title','title is invalid').notEmpty();
    // req.checkBody('description','description is not valid').notEmpty();
    // let error=req.validationErrors();
    let response = {};
    // if(error){
    //     response.error=error;
    //     response.sucess=false;
    //     res.status(422).send(response)
    // }
    noteService.updateNote(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response);
        })
        .catch((err) => {
            response.sucess = false;
            response.data = err;
            res.status(500).send(response);
        })
}

exports.addCollaborator=(req,res)=>{
//    console.log("RQQ---------->",req);
   
    
   
    let response={};
        noteService.addCollaborator(req)
        .then((data)=>{
            response.sucess=true
            response.data=data;
            res.status(200).send(response);
        }).catch((err)=>{
            response.sucess=false
            response.data=err;
            res.status(500).send(response);
        })
}



