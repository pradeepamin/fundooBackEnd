const mongoose = require("mongoose");


/*creating a schema of database*/
var Schema = mongoose.Schema
const fundoNotes = new Schema({
    /** creating schema for registration */
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
    isArchive:{
        type: Boolean,
        default: false
    },
  

},
    {
        timestamps: true
    }
)

exports.notes = mongoose.model("notes", fundoNotes)