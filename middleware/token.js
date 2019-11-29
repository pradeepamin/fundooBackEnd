const jwt=require('jsonwebtoken');
// console.log("in token");
exports.GenerateToken=(payload)=>{
   {
       //console.log("in token id",payload);
       const token =  jwt.sign({payload}, process.env.KEY, { expiresIn:'1h' }) // expires in 1 hour
       const obj = {        
           success: true,
           message: 'Token Generated Successfully!!',
           token: token
       }
       return obj;
   }
}