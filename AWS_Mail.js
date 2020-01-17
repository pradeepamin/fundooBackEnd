
require('dotenv').config();
const AWS = require('aws-sdk');

exports.notification = (details,email) => {
    console.log("Details",details,"email---",email);
    
    return new Promise((resolve, reject) => {

    console.log("notification", details.name);

    AWS.config.getCredentials( (err)=> {
        if (err) console.log(err.stack);
        // credentials not loaded
        else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
        console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
        }                                                                                                                           
        });

    AWS.config.update({ region: process.env.AWS_REGION });

    let params = {
        Message: `You have a reminder : ${details.name} and title : ${details.index}`, /* required */
        TopicArn: process.env.AWS_TOPIC_ARN,
        // Protocol: 'EMAIL',
        // Endpoint: email
    };

    let publishTextPromise = new AWS.SNS().publish(params).promise();

    publishTextPromise.then(
        function (data) {
            resolve(data)
            console.log(`message ${params.Message} send sent to the topic ${params.TopicArn}`);
            console.log("MessageID is ", data.MessageId);
        }).catch(
            function (err) {
                reject(err)
                console.error(err, err.stack);
            });
        })
}
