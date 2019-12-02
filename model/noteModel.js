const mongoose = require("mongoose");


/*creating a schema of database*/
var Schema = mongoose.Schema
const fundoNotes = new Schema({
    /** creating schema for registration */
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

exports.notes = mongoose.model("notes", fundoNotes)