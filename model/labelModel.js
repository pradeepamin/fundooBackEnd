const mongoose = require('mongoose')
const Schema = mongoose.Schema
const addLabels = new Schema({
    "userId": {
        type: String,
        require: true
    },
    "labelName": {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })
exports.LABELS=mongoose.model("label",addLabels)

