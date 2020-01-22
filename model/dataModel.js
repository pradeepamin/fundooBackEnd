const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = Schema({
//   _id: Schema.Types.ObjectId,
  firstName: String,
  lastName:String,
  position:String,
  car: Array
  
});

// const cars = Schema({
  
//   brand: String,
//   year:String,
  
// });

exports.ModelUSER = mongoose.model('carDetails', users);
// exports.ModelCar = mongoose.model('car', cars);