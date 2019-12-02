const mongoose = require("mongoose");


/*creating a schema of database*/
var Schema = mongoose.Schema
const usersData = new Schema({
    /** creating schema for registration */
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

exports.registerUsers = mongoose.model("users", usersData);