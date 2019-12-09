console.log("in token");
const jwt = require('jsonwebtoken')
const runnerRedis = require('../helper/redisCache')
exports.generateToken = (payload) => {
    {
        //console.log("in token id",payload);
        console.log("token-payload-->", payload)
        const token = jwt.sign({ payload }, process.env.KEY, { expiresIn: '7d' }) // expires in 1 hour
        console.log("key------>", process.env.KEY)
        const obj = {
            success: true,
            message: 'Token Generated Successfully!!',
            token: token
        }
        return obj;

    }
}

exports.verify = (req, res, next) => {
    console.log("verifies request");
    var token = req.params.token;
    jwt.verify(token, process.env.KEY, (err, result) => {
        if (err) res.status(422).send({ message: "token is incorrect" });
        else {
            req.decoded = result;
            next();
        }
    })
}

// exports.userVerify = (req, res, next) => {
//     console.log("verifies request");
//     var token = req.headers.token;
//     jwt.verify(token, process.env.KEY, (err, result) => {
//         if (err) res.status(422).send({ message: "token is incorrect" });
//         else {
//             req.decoded = result;
//             next();
//         }
//     })
// }


exports.userVerify = (req, res, next) => {
    console.log("verifies request");
    runnerRedis.getRedis((err, data) => {

        console.log("Redis Data recives in ", data)
        let newData=data.substring(1,data.length-1);
        console.log("Log",newData);
    
        jwt.verify(newData, process.env.KEY, (err, result) => {
            if (err) res.status(422).send({ message: "token is incorrect" });
            else {
                req.decoded = result;
                next();
            }
        })

    });


}