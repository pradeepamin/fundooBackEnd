const mongoose = require("mongoose");
/*creating a schema of database*/
var Schema = mongoose.Schema
const addCollaborator = new Schema({
    /** creating schema for registration */
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    noteId: {
        type: String,
        required: true
    },
    collaboratorId: {
        type: [mongoose.Schema.Types.ObjectId],                    
        required: true,
        ref:"user"
   
    }
},
    {
        timestamps: true
    }
)

exports.COLLABORATOR = mongoose.model("collaborator", addCollaborator)