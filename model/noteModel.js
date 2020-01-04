const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

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
    reminder:{
        // type:Date
        type:String
    },
    "index":{
        type:Number
    },
    "labels":{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"label"

    },
    "noteColor":{
        type:String
       

    },
  

},
    {
        timestamps: true
    }
)

exports.notes = mongoose.model("notes", fundoNotes)