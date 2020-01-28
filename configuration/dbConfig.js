// const express=require('express');

require('dotenv').config()
const mongoose = require('mongoose');
let logger=require('../helper/logger')

dbConnection = () => {

    var db = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

    
    mongoose.connection.on("connected", () => {
        logger.info("Succesfully connected to Database")
    })
    mongoose.connection.on("disconnected", () => {
        logger.error("Could not connect to the database ");
        process.exit();
    })

    mongoose.connection.on("error", () => {
        logger.warn("Error in Connecting to Database");
        process.exit(1)
    })

}
module.exports = { dbConnection }