// const noteService = require('../services/elasticServices')

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    hosts: ['http://127.0.0.1:9200/']
});

exports.createIndex=(req,res)=>{
    let indexName=req.decoded.payload.id
    console.log("Index---->",indexName);
    client.indices.create({index:indexName},((err,resp)=>{
        let response={};
        if(resp){
            console.log("result in index elastic search-->",resp);
            response.succes=resp;
            res.status(200).send(response);
         } else{
            response.succes=err;
            res.status(500).send(response);
                console.log("error in index",err);
         }
    }))
}


exports.addDocument=(req,res)=>{

    console.log("reqqq---in elastic",req);
    
    let data=[];
    req.forEach((element,key)=>{
      data.push({
          index:{
            _index:element._userId,
            _types:"notes"
          }     
      })
    
      let noteData={
        _id:element._id,
        title:element.title,
        description:element.description
    };
    data.push(noteData);
        
    })
    console.log("Arra data---->\n",data);

    client.bulk({body:data},(response,err)=>{
        if(response){
            console.log("Data---->",response);
           
        }else{
            console.log("Err----------->",err); 
        }
    })
}


