const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = Schema({
//   _id: Schema.Types.ObjectId,
  firstName: String,
  lastName:String,
  carName:String


  
});



exports.ModelUSER = mongoose.model('carDetails', users);
