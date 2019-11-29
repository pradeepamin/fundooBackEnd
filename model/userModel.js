const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const emailExistance = require("email-existence");
/*creating a schema of database*/
var Schema = mongoose.Schema;
const usersData = new Schema({
    /** creating schema for registration */
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)



var registerUsers = mongoose.model("users", usersData);


/**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
exports.Register = (req, callback) => {

    try {
        registerUsers.findOne({"email": req.body.email}, (err, data) => {
            if (data) callback("user exits");
            else {
                emailExistance.check(req.body.email, (err, result) => {

                    if (!result) callback("provide valid email")
                    else {
                        bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                            var userDetails = new registerUsers({
                                "firstName": req.body.firstName,
                                "lastName": req.body.lastName,
                                "email": req.body.email,
                                "password": encrypted
                            })
                            userDetails.save((err, data) => {
                                if (err) {
                                    callback(err);
                                } else callback(null, data);
                            })
                        })
                    }
                })

            } console.log("model end")
        })
    } catch (e) {
        console.log(e);
    }
}