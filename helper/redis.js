let rediscache = require('../helper/redisCache')

let data2 = "hi";
rediscache.setRedis(data2,(err,data)=>{
    if(data){
        console.log("set conected",data)
    }else{
        console.log("Error",err);
        
    }
})

rediscache.getRedis((err,data)=>{
    if(data){
        console.log("get REs read",data)
    }else{
        console.log("get set Error",err);
        
    }
});


    