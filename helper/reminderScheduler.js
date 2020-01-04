let schedule = require('node-schedule')
let sns = require('../AWS_Mail')
let services = require('../services/noteServices')

exports.scheduleReminder = (req) => {
    let details;
    console.log("reqqq---<", req.reminder);

    return new Promise((resolve, reject) => {
         let date2 = new Date(req.reminder);
        // console.log("date--->",date);

        var date = new Date(2020, 0, 04, 19, 03, 0);
        var date1 = new Date(req.reminder);
        console.log("date--->",date);
        var j = schedule.scheduleJob(date, function () {
            console.log('The world is going to end today.');
                console.log("true");
                const arr={

                    "index":"pradeep",
                    "name":"amin"
                  }
                  sns.notification(arr);
            
        })
    });
}