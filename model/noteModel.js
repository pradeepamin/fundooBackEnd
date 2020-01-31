const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const userModel = require('../model/userModel')

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
    isArchive: {
        type: Boolean,
        default: false
    },
   
    reminder: {
        type: String
    },
    noteImage: {
        type: String
    },

    "index": {
        type: Number
    },
    "labels": {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "label"
    },
    "noteColor": {
        type: String

    },
    "noteImage": {
        type: String
    }, 
},
    {
        timestamps: true
    }
)

exports.notes = mongoose.model("notes", fundoNotes)

//this function is used to get all users who collaborated with note and return value to noteService -> getCollaborator
exports.getCollaboratorUsers = (colId) => {
    console.log("Data in aggregation",colId);
    

    return new Promise(async (resolve, reject) => {
        try {
            let collabArray = []
            for (let collId of colId) {
                console.log("COll",collId);
                
                let temp = await userModel.USERS.aggregate([{ $match: { email: collId } }, { $group: 
                    { _id: { _id: "$_id",email: "$email", lastName: "$lastName", firstName: "$firstName" } } }]);
                console.log("Dtat in agg-",temp);
                
                collabArray.push(temp[0]);
            }
            resolve(collabArray);
        } catch (err) {
            reject(err)
        }
    })
}
