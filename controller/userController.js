const userServices = require('../services/userServices')

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
                    res.status(404).send(response);
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
    req.checkBody('email', 'Email is invalid').isEmail().notEmpty();
    req.checkBody('password', 'Password is Invalid').notEmpty().len(6, 10);
    var error = req.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.sucess = false;
        res.status(422).send(response)
    } else {
        userServices.login (req, (err, data) => {
            if (err) {
                response.sucess = false;
                response.data = err;
                res.status(404).send(response);
            } else {
                response.sucess = true;
                response.data = data;
                res.status(200).send(response);
            }
        })
    }
}