let schedule = require('node-schedule')
let sns = require('../AWS_Mail')
let services = require('../services/noteServices')
let noteCon=require('../controller/noteController')


exports.scheduleReminder =(req) => {
    let details;
    console.log("reqqq---<", req.email);
    console.log("reqqq---<", req.resolve.reminder);

    let email=req.email;
    return new Promise((resolve, reject) => {
         let date2 = new Date(req.resolve.reminder);
        //  console.log("reminder date--->",date);

        var prp = new Date(2020, 0, 14, 12, 15, 0);
        console.log("Prprrp-0",prp);
        
        console.log("date--->",date2);

        var j = schedule.scheduleJob(date2,  function () {
            
            console.log('The world is going to end today.');
                console.log("true");
                const arr={

                    "index":"pradeep",
                    "name":"amin"
                  }

                
                //   noteCon.resData("You have one reminder")
                  sns.notification(arr,email);
                  resolve('triggered')

                
            
        })
    });
}