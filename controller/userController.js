const userServices = require('../services/userServices')
console.log("In controller");
exports.register = (req, res) => {
    console.log("In controller1");
    req.checkBody('firstName', 'First Name is Invaild').notEmpty().isAlpha();
    req.checkBody('lastName', 'Last Name is Invaild').notEmpty().isAlpha();
    req.checkBody('email', 'Email is invalid').notEmpty().isEmail();
    req.checkBody('password', 'Password is Invalid').notEmpty().len(4, 10);
    var error = req.validationErrors();
    var response = {};
    if (error) {
        response.error = error;
        response.success = false;
        res.status(422).send(response)
        console.log("Error in Register field", error)
        console.log("Responde--->", response)
    } else {
        userServices.register = (req, (err, data) => {
            if (err) {
                response.success = false;
                response.data = err;
                res.status(404).send(response);
            } else {
                respons.success = true;
                response.data = data;
                res.status(200).send(response);
            }
        })
    }
}