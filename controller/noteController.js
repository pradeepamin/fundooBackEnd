const noteService = require('../services/noteServices')
const scheduler = require('../helper/reminderScheduler')
const logger = require('../helper/logger')


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
        logger.error("error-register", error);
        console.log("Response", response)
    } else {
        console.log("Req body---->", req.body)
        noteService.addNote(req)
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
// exports.getCollaboratorNote = (req, res) => {
//     let response = {};
//     noteService.getCollaboratedNotes(req)
//         .then((data) => {
//             response.sucess = true;
//             response.data = data;
//             res.status(200).send(response)
//         })
//         .catch((err) => {
//             response.sucess = false;
//             response.data = err;
//             res.status(404).send(response)
//         })
// }

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
            console.log("data from deleteNote-->", data);

        })
        .catch((err) => {
            response.sucess = false;
            response.data = err;
            res.status(500).send(response);
        })
}

exports.updateNote = (req, res) => {
    let response = {};
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

exports.getDeleteNote = (req, res) => {
    let response = {};
    noteService.getDeleteNote(req)
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

exports.unDeleteNote = (req, res) => {
    let response = {};
    noteService.unDeleteNote(req)
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

exports.addCollaborator = (req, res) => {
    let response = {};
    noteService.addCollaborator(req)
        .then((data) => {
            response.succccess = true
            response.data = data;
            res.status(200).send(response);
        }).catch((err) => {
            response.sucess = false
            response.data = err;
            res.status(500).send(response);
        })
}

exports.getCollaborator = (req, res) => {
    req.checkBody('noteId', 'enter the name as noteId').notEmpty();
    console.log("REQQQ->in controller", req.body);
    let error = req.validationErrors();
    let response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response)
    }
    noteService.getCollaborator(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response)

        })
        .catch((err) => {
            response.sucess = false
            response.data = err;
            res.status(500).send(response)
        })
}

exports.deleteCollaborator = (req, res) => {
    let response = {};
    noteService.deleteCollaborator(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.sucess = false
            response.data = err;
            res.status(500).send(response)
        })
}

exports.getAllCollaborator = (req, res) => {
    let response = {};
    noteService.getAllCollaborator(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.sucess = false
            response.data = err;
            res.status(500).send(response)
        })
}

exports.archiveNote = (req, res) => {
    let response = {};
    noteService.archiveNote(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.sucess = false
            response.data = err;
            res.status(500).send(response)
        })
}

exports.unarchiveNote = (req, res) => {
    let response = {};
    noteService.unarchiveNote(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.sucess = false
            response.data = err;
            res.status(500).send(response)
        })
}

exports.getArchiveNote = (req, res) => {
    let response = {};
    noteService.getArchiveNote(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.sucess = false
            response.data = err;
            res.status(500).send(response)
        })
}

exports.addReminder = (req, res) => {
    let response = {};
    noteService.addReminder(req)
        .then((data) => {
            scheduler.scheduleReminder(data)
            response.sucess = true;
            response.data = data;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.sucess = false
            response.data = err;
            res.status(500).send(response)
        })
}

exports.deleteReminder = (req, res) => {
    let response = {};
    noteService.deleteReminder(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.sucess = false
            response.data = err;
            res.status(500).send(response)
        })
}

exports.createLabel = (req, res) => {
    req.checkBody('labelName', 'NoteName is invalid').notEmpty();
    var error = req.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response);
    } else
        noteService.createLabel(req)
            .then((data) => {
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


exports.updateLabel = (req, res) => {
    var response = {};

    noteService.updateLabel(req)
        .then((data) => {
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

exports.getAllLabel = (req, res) => {
    var response = {};
    noteService.getAllLabel(req)
        .then((data) => {
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

exports.deleteLabel = (req, res) => {
    var response = {};
    noteService.deleteLabel(req)
        .then((data) => {
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

exports.noteLabel = (req, res) => {
    req.check('noteId', 'Id invalid').notEmpty()
    req.check('labelId', 'Id invalid').notEmpty()
    var error = req.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response);

    } else {
        noteService.noteLabel(req)
            .then((data) => {
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

exports.noteLabelUndo = (req, res) => {
    req.check('noteId', 'Id invalid').notEmpty()
    req.check('labelId', 'Id invalid').notEmpty()
    var error = req.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response);
    } else {
        noteService.noteLabelUndo(req)
            .then((data) => {
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

exports.noteColor = (req, res) => {
    var error = req.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response);
    } else {
        noteService.noteColor(req)
            .then((data) => {
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


exports.noteImage = (req, res) => {
    var error = req.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response);
    } else {
        noteService.noteImage(req)
            .then((data) => {
                response.sucesssss = true;
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

exports.deleteNoteImage = (req, res) => {
    let response = {};
    noteService.deleteNoteImage(req)
        .then((data) => {
            response.sucess = true;
            response.data = data;
            res.status(200).send(response)
        })
        .catch((err) => {
            response.sucess = false
            response.data = err;
            res.status(500).send(response)
        })
}

















exports.popEx = (req, res) => {
    let response = {};
    noteService.popEx(req)
        .then((data) => {
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
exports.popEx1 = (req, res) => {
    let response = {};
    noteService.popEx1(req)
        .then((data) => {
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


exports.user = (req, res) => {
    let response = {};
    noteService.user(req)
        .then((data) => {
            response.sucess = true;
            response.data = data
            res.status(200).send(response)
            console.log(response);

        })
        .catch((err) => {
            response.fal = false;
            response.err = err
            res.status(404).send(response)
        })

}
exports.getUser = (req, res) => {
    let response = {};
    noteService.getUser(req)
        .then((data) => {
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






