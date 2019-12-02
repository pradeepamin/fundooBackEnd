
const noteModel = require('../model/noteModel');

exports.addUser = (req) => {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        console.log("req.decoded",req.decoded);
        
        let noteDetails = new noteModel.notes({
            "_userId":req.decoded.payload.id,
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


