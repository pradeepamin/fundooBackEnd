
const userModel=require('../model/userModel')

exports.register=(req,callback)=>{
    userModel.Register=(req,(err,data)=>{
        if(err){
            callback(err);
        }else{
            callback(null,data);
        }
            
        })
}
