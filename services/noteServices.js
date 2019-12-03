
const noteModel = require('../model/noteModel');


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
        noteModel.notes.findByIdAndUpdate({
            _id: req.body._id}, {title: req.body.title,description: req.body.description}, (err, data) => {
                if (err) reject(err)
                else resolve(data)
            })
    })
}
