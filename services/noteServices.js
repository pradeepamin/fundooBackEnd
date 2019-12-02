
const noteModel = require('../model/noteModel');

exports.addUser = (req) => {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        let noteDetails = new noteModel.notes({
            "title": req.body.title,
            "discription": req.body.discription
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


