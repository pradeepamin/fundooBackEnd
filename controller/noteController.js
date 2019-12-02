const noteService = require('../services/noteServices')

exports.addNote = (req, res) => {
    console.log("req.",req.body);
    
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
        console.log("Req body---->",req.body)
        noteService.addUser(req)
            .then((data) => {
                
                console.log("In conttoller");
                response.sucess=true;
                response.data=data
                res.status(200).send(response)
                console.log(response);
                
            })
            .catch((err) => {
                response.sucess=false;
                response.err=err
                res.status(404).send(response)
            })

    
}
}
