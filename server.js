/********************************************************************************************************************
 * @Execution   : default nodemon : server.js
 * @Purpose     : Backend for user Registration,Login,ForgotPassword,ResetPassword.
 * @description : Using express frame work and socketio build a realtime cpplication
 * @overview    : Fundoo BackEnd 
 * @author      : PRADEEP B AMIN<pradeepbamin5@gmail.com>
 * @version     : v12.10.0
 * @since       : 29-NOV-2019
 *
 *******************************************************************************************************************/
//importing express framework 
const express=require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const routerUser=require('./router/userRouter');
const routerNote=require('./router/noteRouter')
const dbConnect=require('../server/configuration/dbConfig')
const expressValidator=require('express-validator');
require('dotenv').config()
const app=express();
app.use(cors());

app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressValidator());

app.use('/user', routerUser);
app.use('/note', routerNote);
console.log("process.env",process.env.PORT);

//Initalizing the app port number,Telling frame work to start service
app.listen(process.env.PORT, () => {
    console.log("Server is listing on port 4000")
    dbConnect.dbConnection();
});

module.exports = app