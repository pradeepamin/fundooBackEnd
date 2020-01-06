
const userModel = require('../model/userModel')
const emailExistance = require("email-existence");
const bcrypt = require('bcrypt');
const collaboratorModel = require('../model/collaboratorModel');
const mongoose = require("mongoose");
exports.register = (req, callback) => {
    /**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
    userModel.USERS.findOne({ "email": req.body.email }, (err, data) => {
        if (data) callback("user exits")

        else {
            emailExistance.check(req.body.email, (err, result) => {

                if (!result) callback("provide valid email")
                else {
                    bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                        var userDetails = new userModel.USERS({
                            // "_id":new mongoose.Types.ObjectId(),
                            "firstName": req.body.firstName,
                            "lastName": req.body.lastName,
                            "email": req.body.email,
                            "password": encrypted
                        })
                        userDetails.save((err, data) => {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, data);
                            }
                            // console.log("Author id--->", userDetails._id);
                            // const colab = new collaboratorModel.COLLABORATOR({
                            //     title: 'Casino Royale',
                            //     userId: userDetails._id
                            // });
                
                            // colab.save((err, data) => {
                            //     if (data) {
                            //         resolve(data);
                            //     } else {
                            //         reject(err);
                            //     }
                
                            // })

                        })

                    })
                }
            })

        } console.log("model end")
    })
}

exports.login = (req, callback) => {
    userModel.USERS.findOne({ "email": req.body.email }, (err, data) => {
        if (data) {
            console.log(("DATA PASSWORD_------>", data));

            bcrypt.compare(req.body.password, data.password, (err, sucess) => {
                if (sucess)
                    callback(null, data);
                else
                    callback("wrong Password");
            })
        }
        else
            callback("email doesnt match or exit")
    })
}

exports.forgotPassword = (req, callback) => {
    userModel.USERS.findOne({ "email": req.body.email }, (err, data) => {
        if (data) {
            callback(null, data)
        }
        else {
            callback("User name not registed or not exists")
        }
    })
}
exports.resetPassword = (req, callback) => {
    console.log("reqqqqq", req.decoded);
    bcrypt.hash(req.body.password, 10, (err, encrypted) => {
        userModel.USERS.updateOne({ "_id": req.decoded.payload }, { "password": encrypted }, (err, data) => {
            if (data)
                callback(null, data);
            else
                callback(err);
        })
    })
}

exports.imageUpload = (req, imageUrl, callback) => {

    console.log("user id", req.decoded.payload.id);
    userModel.USERS.findOne({ "_id": req.decoded.payload.id }, (err, data) => {
        if (err) {
            callback(err);
        } else {
            userModel.USERS.updateOne({ "_id": req.decoded.payload.id }, { "imageUrl": imageUrl }, (err, data1) => {
                if (err) {
                    callback(err);
                } else {
                    console.log("data1", data1);
                    callback(null, data1)
                }
            })
        }
    })
}
exports.getAllUser = (req) => {

    return new Promise((resolve, reject) => {

        userModel.USERS.find({}, (err, result) => {
            if (err) {
                reject(err)
            } else {

                resolve(result)
                console.log("resullt-->", result);

            }
        })
    })

}

