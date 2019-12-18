let schedule = require('node-schedule')
let sns = require('../snsNew')
let services = require('../services/noteServices')

exports.scheduleReminder = (req) => {
    let details;
    console.log("reqqq---<", req);

    return new Promise((resolve, reject) => {
        // let date = new Date(req.reminder);
        // console.log("date--->",date);

        var date = new Date(2019, 11, 18, 19, 25, 0);

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