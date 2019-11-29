
const userModel=require('../model/userModel')

exports.register = (req, callback) => {
    try{
        userModel.Register(req, (err, data) => {
              if (err) {
                  callback(err);
              } else
                  callback(null, data);
          })
      } catch (e) {
          console.log(e);
      }
  }

  exports.login = (req, callback) => {
    try{
        userModel.Login(req, (err, data) => {
              if (err) {
                  callback(err);
              } else
                  callback(null, data);
          })
      } catch (e) {
          console.log(e);
      }
  }