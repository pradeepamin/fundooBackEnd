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
    },
    imageUrl: {
        type: String
    }
},
    {
        timestamps: true
    }
)

exports.USERS = mongoose.model("users", usersData);

