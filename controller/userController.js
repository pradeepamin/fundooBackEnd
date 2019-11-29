const userServices = require('../services/userServices')

console.log("In controller");

exports.register = (req, res) => {
    try {
        console.log("In controller---->");
        req.checkBody('firstName', 'firstname is invalid').notEmpty().isAlpha();
        req.checkBody('lastName', 'lastname is invalid').notEmpty().isAlpha();
        req.checkBody('email', 'email is invalid').notEmpty().isEmail();
        req.checkBody('password', 'password is invalid').notEmpty().len(6,10);
        var error = req.validationErrors();
        var response = {};
        if (error) {
            response.error = error;
            response.sucess = false;
            res.status(422).send(response);
            console.log("errpo-register", error);
            console.log("REs", response)
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