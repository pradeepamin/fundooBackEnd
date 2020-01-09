
const mongoose = require('mongoose')
const noteModel = require('../model/noteModel');
const collaboratorModel = require('../model/collaboratorModel');
const labelModel = require('../model/labelModel')
const cacheNote = require('../helper/redisCache')
const reminderSchedule = require('../helper/reminderScheduler')
const userModel = require('../model/userModel')
// // const elastic = require('../helper/elasticSearch')

const pop = require('../model/populate')

exports.addNote = (req) => {
    try {
        console.log(req.body);
        return new Promise((resolve, reject) => {
            console.log("req.decoded", req.decoded);
            let noteDetails = new noteModel.notes({
                "_userId": req.decoded.payload.id,
                "title": req.body.title,
                "description": req.body.description
            })
            noteDetails.save((err, data) => {
                if (data) {
                    resolve(data);
                } else {
                    reject(err);
                }
                //this is called to re-set cache notes when new notes are added
                // elastic.deleteDocument(req)
                cacheNote.delRedisNote(req.decoded.payload.id)
            })
        })
    } catch (e) {
        console.log(e);
    }
}

exports.getAllNote = (req) => {
    try {
        return new Promise((resolve, reject) => {
            cacheNote.getRedisNote(req.decoded.payload.id, (err, data) => {
                if (data)
                    resolve(data),
                        // elastic.addDocument(data),
                        console.log("Data in cache");
                else {
                    noteModel.notes.find({ _userId: req.decoded.payload.id, isDeleted: false, isArchive: false }, (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            if (!result.length == 0) {  //this condition to check whether get note is empty or not
                                resolve(result)
                                console.log("resullt-->", result);
                                let valueCache = {};
                                valueCache.id = req.decoded.payload.id;
                                valueCache.result = result;
                                //this called to set Notes in cache.
                                cacheNote.setRedisNote(valueCache, (err, data) => {
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
    } catch (e) {
        console.log(e);
    }
}
//getCollaboratorNote this function is used to get noteid of whom been collaborated
exports.getCollaboratedNotes = async (req) => {
 
    
    try {
        return await new Promise((resolve, reject) => {
            collaboratorModel.COLLABORATOR.find({collaboratorId: req.decoded.payload.email}).populate('noteId').exec((err, data) => {
                if (data) resolve(data), console.log("getting collab notes", data);
                else reject(err)
            })

        })
    } catch (e) {
        console.log(e);
    }
}



exports.deleteNote = (req) => {
    try {
        console.log("REQQ------>", req);
        return new Promise((resolve, reject) => {
            noteModel.notes.findByIdAndUpdate({ _id: req.body.userId }, { isDeleted: true }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)


                }
                cacheNote.delRedisNote(req.decoded.payload.id)
                console.log("Data delete from redies cache to update the archive");

            })

        })
    } catch (e) {
        console.log(e);
    }
} //unDeleteNote

exports.unDeleteNote = (req) => {
    // console.log("req----->",req);
    try {

        return new Promise((resolve, reject) => {
            noteModel.notes.findByIdAndUpdate({ _id: req.body.noteId }, { isDeleted: false }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)

                }
                cacheNote.delRedisNote(req.decoded.payload.id)

            })

        })
    } catch (e) {
        console.log(e);
    }
}


//getDeleteNote
exports.getDeleteNote = (req) => {

    return new Promise((resolve, reject) => {

        noteModel.notes.find({ _userId: req.decoded.payload.id, isDeleted: true, isArchive: false }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                if (!result.length == 0) {  //this condition to check whether get note is empty or not
                    resolve(result)
                    console.log("resullt-->", result);

                } else {
                    console.log("NO Notes");
                    reject("No Notes")
                }
            }
        })
    })
}


exports.updateNote = (req) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.findByIdAndUpdate({ _id: req.body._id }, { title: req.body.title, description: req.body.description }, (err, data) => {
                if (err) reject(err)
                else resolve(data)

                // elastic.deleteDocument(req)
                cacheNote.delRedisNote(req.decoded.payload.id)


            })
        })
    } catch (e) {
        console.log(e);
    }
}
/*
"noteId":"",
"collaboratorID":""
*/
// exports.addCollaborator = (req) => {
//     try {
//         return new Promise((resolve, reject) => {


//             if (req.decoded.payload.id != req.body.collaboratorId) {


//                 collaboratorModel.COLLABORATOR.findOne({ "noteId": req.body.noteId }, (err, data) => {
//                     if (err || data == null) {
//                         let newCollaborator = new collaboratorModel.COLLABORATOR({
//                             "_id": new mongoose.Types.ObjectId(),
//                             "_userId": req.decoded.payload.id,
//                             "noteId": req.body.noteId,
//                             "collaboratorId": req.body.collaboratorId
//                         })
//                         newCollaborator.save((err, data) => {
//                             if (data) {
//                                 resolve(data);

//                             } else {
//                                 reject(err)
//                             }
//                         })
//                     }
//                     else {
//                         let arrayCollaborator = data.collaboratorId;
//                         //used fetch only disticnt value.
//                         if (arrayCollaborator.includes(req.body.collaboratorId)) {
//                             reject("User already exits")

//                         } else
//                             collaboratorModel.COLLABORATOR.updateOne({ "noteId": req.body.noteId },
//                                 { $push: { "collaboratorId": req.body.collaboratorId } }, (err, data) => {
//                                     if (data) {
//                                         resolve(data)
//                                     } else {


//                                         reject(err)
//                                     }
//                                 })
//                     }
//                 })

//             } else {
//                 console.log("This is your email id. Cannot be collaborate!");
//                 reject("This is your email id. Cannot be collaborate!")
//             }
//         })
//     } catch (e) {
//         console.log(e);
//     }
// }
// /*
// "noteId":"",
// */
// const fundooUsers=require('../model/noteModel')
// exports.getCollaborator = async (req, res) => {
//     try {

//         return await new Promise(async (resolve, reject) => {
//             collaboratorModel.COLLABORATOR.findOne({ "noteId": req.body.noteId }, async (err, data) => {
//                 console.log("Note id to print", req.body.noteId );

//                 if (data) {
//                     let onlyCollaboratorId = data.collaboratorId;
//                     let colabUsersDetails=  await fundooUsers.getCollaboratorUsers(onlyCollaboratorId);
//                     console.log("result in collb service--->",colabUsersDetails);

//                     let response1={}
//                     response1.data=data;
//                     response1.collaboratorUsers=colabUsersDetails;
//                     resolve(response1)

//                 } else {
//                     reject(err)
//                     console.log("Note id not found");

//                 }
//             })
//         })
//     } catch (e) {
//         console.log(e);
//     }
// }

/*
"noteId":"",
"collaboratorID":""
*/
exports.deleteCollaborator = (req, res) => {
    try {
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
    } catch (e) {
        console.log(e);
    }
}


exports.getAllCollaborator = async (req, res) => {

    return await new Promise((resolve, reject) => {
        collaboratorModel.COLLABORATOR.find({}, (err, data) => {
            console.log("Note id to print", req.body.noteId);

            if (data) {

                resolve(data)

            } else {
                reject(err)

            }
        })
    })
}


exports.archiveNote = (req) => {
    try {
        console.log("req----->", req);

        return new Promise((resolve, reject) => {
            noteModel.notes.findByIdAndUpdate({ _id: req.body.noteId }, { isArchive: true }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)

                }
                cacheNote.delRedisNote(req.decoded.payload.id)
                console.log("Data delete from redies cache to update the archive");


            })

        })
    } catch (e) {
        console.log(e);
    }
}

exports.unarchiveNote = (req) => {
    // console.log("req----->",req);
    try {

        return new Promise((resolve, reject) => {
            noteModel.notes.findByIdAndUpdate({ _id: req.body.noteId }, { isArchive: false }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)

                }
                cacheNote.delRedisNote(req.decoded.payload.id)

            })

        })
    } catch (e) {
        console.log(e);
    }
} //getArchiveNote

exports.getArchiveNote = (req) => {

    return new Promise((resolve, reject) => {

        noteModel.notes.find({ _userId: req.decoded.payload.id, isDeleted: false, isArchive: true }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                if (!result.length == 0) {  //this condition to check whether get note is empty or not
                    resolve(result)
                    console.log("resullt-->", result);

                } else {
                    console.log("NO Notes");
                    reject("No Notes")
                }
            }
        })
    })
}




exports.findNote = (req) => {
    try {
        return new Promise((resolve, reject) => {
            noteSchema.notes.findOne({
                '_id': req.body.noteId
            }, (err, details) => {
                if (err) reject(err)
                else {
                    resolve(details)
                }
            })
        })
    } catch (e) {
        console.log(e)
    }
}

exports.addReminder = (req) => {
    try {
        let date = new Date(req.body.reminder)
        return new Promise((resolve, reject) => {

            noteModel.notes.findOneAndUpdate({ _id: req.body.noteId }, { reminder: req.body.reminder }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)

                }
            })
        })
    } catch (e) {
        console.log(e);
    }
}




exports.deleteReminder = (req) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.updateOne({ _id: req.body.noteId }, { $unset: { reminder: "" } }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)

                }
            })

        })
    } catch (e) {
        console.log(e);
    }
}

exports.createLabel = (req) => {
    try {
        return new Promise((resolve, reject) => {
            let lableDetails = new labelModel.LABELS({
                labelName: req.body.labelName,
                userId: req.decoded.payload.id
            })
            lableDetails.save((err, data) => {
                if (data) {
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    } catch (e) {
        console.log(e);
    }
}
exports.updateLabel = (req) => {
    try {
        return new Promise((resolve, reject) => {
            labelModel.LABELS.updateOne({ _id: req.body._id }, { labelName: req.body.labelName }, (err, data) => {
                if (data) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    } catch (e) {
        console.log(e);
    }
}
exports.getAllLabel = (req) => {
    try {
        return new Promise((resolve, reject) => {
            labelModel.LABELS.find({ userId: req.decoded.payload.id }, (err, data) => {
                if (data) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })

        })
    } catch (e) {
        console.log(e);
    }
}
exports.deleteLabel = (req) => {
    try {
        return new Promise((resolve, reject) => {
            labelModel.LABELS.deleteMany({ _id: req.body.labelId }, (err, data) => {
                if (data) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })

        })
    } catch (e) {
        console.log(e);
    }
}

exports.noteLabel = (req) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.findById({ _id: req.body.noteId }, (err, data) => {

                if (data.labels.includes(req.body.labelId)) reject("User already exits")
                else {
                    noteModel.notes.updateOne({ _id: req.body.noteId }, { $push: { labels: req.body.labelId } }, (err, data) => {
                        if (data) {
                            // console.log("updated", update);
                            resolve(data)
                        } else {
                            reject(err)
                        }
                    })
                }
            })

        })
    } catch (e) {
        console.log(e);
    }
}

exports.noteLabelUndo = (req) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.notes.findById({ _id: req.body.noteId }, (err, data) => {

                if (!data.labels.includes(req.body.labelId)) reject("LabelID is not available in note")
                else {
                    noteModel.notes.updateOne({ _id: req.body.noteId }, { $pull: { labels: req.body.labelId } }, (err, data) => {
                        if (data) {
                            // console.log("updated", update);
                            resolve(data)
                        } else {
                            reject(err)
                        }
                    })
                }
            })

        })
    } catch (e) {
        console.log(e);
    }
}

exports.noteColor = (req) => {
    return new Promise((resolve, reject) => {

        noteModel.notes.findOneAndUpdate({ _id: req.body.noteId }, { noteColor: req.body.noteColor }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)

            }
            cacheNote.delRedisNote(req.decoded.payload.id)

        })
    })
}








exports.popEx = (req) => {
    return new Promise((resolve, reject) => {
        console.log("author");

        let author = new pop.Person({
            "_id": new mongoose.Types.ObjectId(),
            "name": 'Ian Fleming',
            "age": 50

        })
        author.save((err, data) => {
            if (data) {
                resolve(data);
            } else {
                reject(err);
            }
            console.log("Author id--->", author._id);

            const story1 = new pop.Story({
                title: 'Casino Royale',
                author: author._id
            });

            story1.save((err, data) => {
                if (data) {
                    resolve(data);
                } else {
                    reject(err);
                }

            })
        })
        console.log("populare");
    })
}

exports.popEx1 = (req) => {

    return new Promise((resolve, reject) => {
        pop.Story.findOne({ title: 'Casino Royale' }).
            populate('author').exec((err, story) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('The author is %s', story.author.name);
                    resolve(story);

                }
            });

    })
}

exports.addCollaborator = (req) => {
    try {
        return new Promise((resolve, reject) => {



            if (req.decoded.payload.email != req.body.collaboratorId) {


                collaboratorModel.COLLABORATOR.findOne({ "noteId": req.body.noteId }, (err, data) => {
                    if (err || data == null) {
                        let newCollaborator = new collaboratorModel.COLLABORATOR({
                            "_id": new mongoose.Types.ObjectId(),
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
    } catch (e) {
        console.log(e);
    }
}
/*
"noteId":"",
*/
const fundooUsers = require('../model/noteModel')
exports.getCollaborator = async (req, res) => {
    try {

        return await new Promise(async (resolve, reject) => {
            collaboratorModel.COLLABORATOR.findOne({ "noteId": req.body.noteId }, async (err, data) => {
                console.log("Note id to print", req.body.noteId);

                if (data) {
                    let onlyCollaboratorId = data.collaboratorId;
                    let colabUsersDetails = await fundooUsers.getCollaboratorUsers(onlyCollaboratorId);
                    console.log("result in collb service--->", colabUsersDetails);

                    let response1 = {}
                    response1.data = data;
                    response1.collaboratorUsers = colabUsersDetails;
                    resolve(response1)

                } else {
                    reject(err)
                    console.log("Note id not found");

                }
            })
        })
    } catch (e) {
        console.log(e);
    }
}





