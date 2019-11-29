const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const emailExistence=require('email-existence');
 
var Schema=mongoose.Schema;

const userData=new Schema({
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
);
var registredUser=mongoose.model("users",userData);

exports.Register=(req,callback)=>{
    registredUser.findOne({"email":req.body.email},(err,data)=>{
        if(data)callback("User Already Exists");
        else{
            emailExistence.check(req.bodu.email,(err,result)=>{
                if(!result)callback("Provide vaild email")
                else{
                    bcrypt.hash(req.body.password,10,(err,encrypted)=>{
                        var userDetails=new registredUser({
                            "firstName":req.body.firstName,
                            "lastName":req.body.lastName,
                            "email":req.body.email,
                            "password":encrypted
                        })
                        userDetails.save((err,data)=>{
                            if(err){
                                callback(err)
                            }
                            else{
                                callback(null,data)
                            }
                        })

                    })
                }
            })
        }
    } )
}




