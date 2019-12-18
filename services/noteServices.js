
const noteModel = require('../model/noteModel');
const collaboratorModel = require('../model/collaboratorModel');
const cacheNote = require('../helper/redisCache')
const elastic = require('../helper/elasticSearch1')

exports.addNote = (req) => {
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
            cacheNote.delRedisNote(req.decoded.payload.id)

        })
    })
}

exports.getAllNote = (req) => {

    return new Promise((resolve, reject) => {
        cacheNote.getRedisNote(req.decoded.payload.id, (err, data) => {
            if (data)
                resolve(data),
                    // console.log("data in eggg------>",data),

                    elastic.addDocument(data),
                    console.log("Data in cache");

            else {

                noteModel.notes.find({ _userId: req.decoded.payload.id, isDeleted: false, isArchive: false }, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        if (!result.length == 0) {
                            resolve(result)
                            console.log("resullt-->", result);

                            let valueCache = {};
                            valueCache.id = req.decoded.payload.id;
                            valueCache.result = result;
                            cacheNote.setRedisNote(valueCache, (err, data) => {
                                //  elastic.createIndex(data)
                                if (data) {

                                    console.log("seted to cache");

                                } else {
                                    console.log("not set in cache");

                                }
                            })
                        } else {
                            console.log("NO Notes");
                            reject("No Notes")

                        }

                    }
                })
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
/*
"noteId":"",
"collaboratorID":""
*/
exports.addCollaborator = async (req) => {
    return await new Promise((resolve, reject) => {

        if (req.decoded.payload.id != req.body.collaboratorId) {

            collaboratorModel.COLLABORATOR.findOne({ "noteId": req.body.noteId }, (err, data) => {
                if (err || data == null) {
                    let newCollaborator = new collaboratorModel.COLLABORATOR({
                        "_userId": req.decoded.payload.id,
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
/*
"noteId":"",
*/
exports.getCollaborator = async (req, res) => {

    return await new Promise((resolve, reject) => {
        collaboratorModel.COLLABORATOR.findOne({ "noteId": req.body.noteId }, (err, data) => {
            if (data) {
                let getOnlyCollaborator = data.collaboratorId;
                resolve(getOnlyCollaborator)
            } else {
                reject("Note id not found", err)
            }
        })
    })
}

/*
"noteId":"",
"collaboratorID":""
*/
exports.deleteCollaborator = (req, res) => {
    return new Promise((resolve, reject) => {
        //this function is used only to fetch data and view
        collaboratorModel.COLLABORATOR.findOne({ "noteId": req.body.noteId }, (err, data) => {
            console.log("data--->", data.collaboratorId);

            if (data.collaboratorId.includes(req.body.collaboratorId)) {
                //this function is used to remove the given collaborator id from the list
                collaboratorModel.COLLABORATOR.updateOne({ "noteId": req.body.noteId },
                    { $pull: { "collaboratorId": req.body.collaboratorId } }, (err, data) => {
                        if (data) {
                            resolve(data)
                        } else {
                            reject(err)
                        }
                    })
            } else {
                reject("Given user not in the collaborator list", err)
            }

        })

    })
}

exports.archiveNote = (req) => {
    console.log("req----->", req);

    return new Promise((resolve, reject) => {
        noteModel.notes.findByIdAndUpdate({ _id: req.body.noteId }, { isArchive: true }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)

            }
        })

    })
}

exports.unarchiveNote = (req) => {
    // console.log("req----->",req);

    return new Promise((resolve, reject) => {
        noteModel.notes.findByIdAndUpdate({ _id: req.body.noteId }, { isArchive: false }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)

            }
        })

    })
}

exports.addReminder = (req) => {
    return new Promise((resolve, reject) => {
        noteModel.notes.findOneAndUpdate({ _id: req.body.noteId }, { reminder: req.body.reminder }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)

            }
        })

    })
}


exports.deleteReminder = (req) => {
    return new Promise((resolve, reject) => {
        noteModel.notes.updateOne({ _id: req.body.noteId }, { $unset: { reminder: "" } }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)

            }
        })

    })
}

