
const userModel=require('../model/userModel')
const emailExistance = require("email-existence");
const bcrypt = require('bcrypt');

exports.register = (req, callback) => {
    /**
 * @desc Gets the input from front end and stores data in deatabase
 * @param req request contains all the requested data
 * @param callback a callback function
 * @return return a call back function err or data
 */
    userModel.registerUsers.findOne({"email": req.body.email}, (err, data) => {
        if (data) callback("user exits");
        else {
            emailExistance.check(req.body.email, (err, result) => {

                if (!result) callback("provide valid email")
                else {
                    bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                        var userDetails = new userModel.registerUsers({
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
  }

  exports.login = (req, callback) => {
    userModel.registerUsers.findOne({"email":req.body.email},(err,data)=>{
        if(data){
            bcrypt.compare(req.body.password,data.password,(err,sucess)=>{
                if(sucess)
                callback(null,data);
                else
                callback("wrong Password");
            })
        }
        else
        callback ("email doesnt match or exit")
    } )
  }

  exports.forgotPassword = (req, callback) => {
    userModel.registerUsers.findOne({"email":req.body.email},(err,data)=>{
        if(data){
            callback(null,data)
        }
        else{
            callback("User name not registed or not exists")
        }
    })
  }
  exports.resetPassword = (req, callback) => {
    console.log("reqqqqq", req.decoded);
    bcrypt.hash(req.body.password,10,(err,encrypted)=>{
        userModel.registerUsers.updateOne({"_id":req.decoded.payload},{"password":encrypted},(err,data)=>{
            if(data)
            callback(null,data);
            else
            callback(err);
        })
    })
  }