const express=require('express');
const bodyParser=require('body-parser');
const routerUser=require('./router/userRouter');
const dbConnect=require('../server/configuration/dbConfig')
const expressValidator=require('express-validator');
require('dotenv').config()

const app=express();

app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressValidator());
app.use('/', routerUser);

app.listen(process.env.PORT, () => {
    console.log("Server is listing on port 4000")
    dbConnect.dbConnection();
});

