
const noteModel = require('../model/noteModel');
const collaboratorModel = require('../model/collaboratorModel');


exports.addUser = (req) => {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        console.log("req.decoded", req.decoded);
        let noteDetails = new noteModel.notes({
            "_userId": req.decoded.payload.id,                                //req.decoded.payload.id,
            "title": req.body.title,
            "description": req.body.description
        })
        noteDetails.save((err, data) => {
            if (data) {
                resolve(data);
            } else {
                reject(err);
            }
        })
    })
}

exports.getAllNote = (req) => {
    console.log("req in get all notes------------->", req);
    return new Promise((resolve, reject) => {
        noteModel.notes.find({ _userId: req.decoded.payload.id, isDeleted: false }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })

    })

}

exports.deleteNote = (req) => {
    console.log("REQQ------>", req);
    return new Promise((resolve, reject) => {
        noteModel.notes.findByIdAndUpdate({ _id: req.body.userId }, { isDeleted: true }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)

            }
        })

    })
}


exports.updateNote = (req) => {
    return new Promise((resolve, reject) => {
        noteModel.notes.findByIdAndUpdate({ _id: req.body._id }, { title: req.body.title, description: req.body.description }, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

exports.addCollaborator = async (req) => {
    return await new Promise((resolve, reject) => {
    
        if (req.decoded.payload.id != req.body.collaboratorId) {

            collaboratorModel.COLLABORATOR.findOne({ "noteId": req.body.noteId }, (err, data) => {
                if (err || data == null) {
                    let newCollaborator = new collaboratorModel.COLLABORATOR({
                        "_userId": verfifedPayload,
                        "noteId": req.body.noteId,
                        "collaboratorId": req.body.collaboratorId
                    })
                    newCollaborator.save((err, data) => {
                        if (data) {
                            resolve(data);

                        } else {
                            reject(err)
                        }
                    })
                }
                else {
                    let arrayCollaborator = data.collaboratorId;
                    //used fetch only disticnt value.
                    if (arrayCollaborator.includes(req.body.collaboratorId)) {
                        reject("User already exits")
                    } else
                        collaboratorModel.COLLABORATOR.updateOne({ "noteId": req.body.noteId },
                            { $push: { "collaboratorId": req.body.collaboratorId } }, (err, data) => {
                                if (data) {
                                    resolve(data)
                                } else {
                                    reject(err)
                                }
                            })
                }
            })

        } else {
            console.log("This is your email id. Cannot be collaborate!");
            reject("This is your email id. Cannot be collaborate!")
        }
    })
}



