const winston=require('winston')
let logger=winston.createLogger({
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename:'combined.log'})
    ]
});
module.exports=logger