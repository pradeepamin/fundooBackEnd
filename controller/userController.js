const userServices = require('../services/userServices')
const tokenGenerate = require('../middleware/token');
const nodemailer = require('../middleware/nodeMailer');
require('dotenv').config();

/**
 * @desc Gets the input from front end filters and performs validation  
 * @param req request contains all the requested data
 * @param response sends the data or err  
 * @return responses with a http response
 */
exports.register = (req, res) => {
    try {
        req.checkBody('firstName', 'firstname is invalid').notEmpty().isAlpha();
        req.checkBody('lastName', 'lastname is invalid').notEmpty().isAlpha();
        req.checkBody('email', 'email is invalid').notEmpty().isEmail();
        req.checkBody('password', 'password is invalid').notEmpty().len(6, 10);
        req.checkBody('confirmPassword', 'Confirm password is incorrect').notEmpty().len(6, 10).equals(req.body.password);
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.sucess = false;
            res.status(422).send(response);
            console.log("error-register", error);
            console.log("Response", response)
        } else {
            userServices.register(req, (err, data) => {
                if (err) {
                    response.sucessss = false;
                    response.data = err;
                    res.status(500).send(response);
                } else {
                    response.sucess = true;
                    response.data = data;
                    res.status(200).send(response);
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
}

exports.login = (req, res) => {
    console.log("IN login")
    req.checkBody('email', 'Email is invalid').isEmail().notEmpty();
    req.checkBody('password', 'Password is Invalid').notEmpty().len(6, 10);
    var error = req.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response)
    } else {
        userServices.login(req, (err, data) => {
            if (err) {
                response.sucess = false;
                response.data = err;

                res.status(404).send(response);
            } else {

                response.sucess = true;
                let data1 = []
                data1.push(tokenGenerate.generateToken({
                    "email": req.body.email,
                    "id": data._id
                })
                )
                data1.push(data)
                response.data=data1
                res.status(200).send(response);
            }
        })
    }
}

exports.forgotPassword = (req, res) => {
    console.log("IN con forgot pass")
    req.checkBody('email', 'Email is Invalid').isEmail().notEmpty();
    var error = req.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response);
    } else {
        userServices.forgotPassword(req, (err, data) => {
            console.log("display req", req.body)
            if (err) {
                response.sucessx = false;
                response.data = err;
                res.status(404).send(response);
            } else {
                let payload = data._id;
                let obj = tokenGenerate.generateToken(payload);
                console.log("Token in contoller-->env,", process.env.URL)
                let url = `${process.env.URL}${obj.token}`
                console.log("controller Payload------>>>", url);
                console.log("Email id", req.body.email);


                nodemailer.sendMail(url, req.body.email)
                response.sucess = true;
                response.data = data;
                res.status(200).send(response);
            }
        })
    }

}
exports.resetPassword = (req, res) => {
    req.checkBody('password', 'password is invalid').notEmpty().len(6, 10);
    req.checkBody('confirmPassword', 'confirm password is invaild').notEmpty().len(6, 10).equals(req.body.password);
    var error = req.validationErrors();
    if (req.body.password != req.body.confirmPassword) {
        console.log("Entered password is not matching");
        response.error = error;
        res.status(400).send('Password is not Matching')
    }
    else {
        var response = {}
        if (error) {
            response.error = error;
            response.sucess = false;
            res.status(422).send(response);
        } else {
            userServices.resetPassword(req, (err, data) => {
                if (err) {
                    response.data = err;
                    res.status(404).send(response);
                } else {
                    response.data = data;
                    res.status(200).send(response)
                }
            })
        }
    }
}