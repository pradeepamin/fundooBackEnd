const mongoose = require("mongoose");
/*creating a schema of database*/
var Schema = mongoose.Schema
const addCollaborator = new Schema({
    /** creating schema for registration */
    // _id: Schema.Types.ObjectId,
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    noteId: {
        type: Schema.Types.ObjectId,
        ref: "notes",
        required: true
    },
    collaboratorId:[ {
        // type: [mongoose.Schema.Types.ObjectId],      
        type: String,                  
        required: true,
        ref:"user"
   
    }]
},
    {
        timestamps: true
    }
)
exports.COLLABORATOR = mongoose.model("collaborator", addCollaborator)