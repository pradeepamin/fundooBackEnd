const redis = require('redis');
const client = redis.createClient();

client.on('connect', ()=> {
    console.log('connected redis');
});

client.on('error', (err) => {
    console.log("Error " + err)
});





exports.setRedis = (val,callback) => {
    client.set('key', JSON.stringify(val), (err, result) => {
        if (result) {
            console.log("token set in cache",result);
            callback(null,result);
           
        } else {
            console.log("error in setting data");
            callback(err);
        }
    })
}

exports.getRedis=(callback)=>{
    client.get("key",(err,data)=>{
        if(data){
            callback(null,data);
            // console.log("GET DATA-->");
        }else{
            callback(err);
            console.log("no data");
            
        }
    })
}
delRedis=()=>{
    client.del("key",(err,data)=>{
        if(data){
            console.log("Data to delete",data);
        }else{
            console.log("no data");
            
        }
    })
}



// module.exports={setRedis,getRedis,delRedis}
// setRedis = (value,callback) => {
//     console.log("value---",value.token);

//     client.set("key", 30000, JSON.stringify(value), (err, data) => {
//         if (data) {
//             console.log("token set in cache");
//            callback(null, data);
//         } else {
//             callback("Error");
//         }
//     })
// }