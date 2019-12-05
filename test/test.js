/********************************************************************************************************************
 * @Execution   : default nodemon : test.js
 * @Purpose     : To compare the output of a certain test with its expected value.
 * @description : Testing is done for user,notes
 * @overview    : Chai mocha 
 * @author      : PRADEEP B AMIN<pradeepbamin5@gmail.com>
 * @version     : chai:4.2.0,chai-http:4.3.0, mocha:6.0.0
 * @since       : 03-DEC-2019
 * @Start       : /Desktop/Pradeep/fundoo/server$ npm test
 *
 *******************************************************************************************************************/

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
let server = require('../server')
let fs = require('fs');

function readFile() {

    //@description:read file from json

    let data = fs.readFileSync('/home/admin1/Desktop/Pradeep/fundoo/server/test/test.json');
    let data1 = JSON.parse(data);
    return data1;
}
/**
 * @description:test script for user-registration 
 */
describe('Status and content', function () {
    describe('Registration page', function () {
        let data1 = readFile();
        it('status ', function (done) {
            chai.request(server).post('/user/register').send(data1.registration).end((err, res) => {
                // console.log("register------->",res.body);
                if (err) {
                    console.log("expect ==>", err);
                    err.should.have.status(500);
                } else {
                    console.log("expect result ==>", res.body);
                    res.should.have.status(200);

                    done()
                }
            })
        })
    })
    /*
     * @description:test script for user-login
    */
    describe('Login page', function ()  {
        let data1 = readFile();
        it('status ', function (done) {
            chai.request(server).post('/user/login').send(data1.login).end((err, res) => {
                if (err) {
                    console.log("expect ==>", err);
                } else {
                    console.log("expect ==>", res.body);
                    res.should.have.status(200);
                    done()
                }
            })
        })
    })
    /*
      * @description:test script for user-forgotPassword
    */
    describe('forgotPassword page', function () {
        let data1 = readFile();
        it('status ', function (done) {
            chai.request(server).post('/user/forgotPassword').send(data1.forgotPassword).end((err, res) => {
                if (err) {
                    console.log("forgotPassword expect ==>", err);
                } else {
                    console.log("forgotPassword expect ==>", res.body);
                    res.should.have.status(200);
                    done()
                }
            })
        })
    })

    /*
      * @description:test script for user-resetPassword
    */
    describe('resetPassword page', function () {
        let data1 = readFile();
        it('status ', function (done) {
            chai.request(server).post('/user/resetPassword/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNWRlNWY3MmNhYjQ1Y2QyMzc5ZjU2Mzc0IiwiaWF0IjoxNTc1MzUzODA4LCJleHAiOjE1NzU0NDAyMDh9.CJwCOThJZ0pDVqEsJhwVtpJnYkX2Ula5XT_Z3nLNfV8').send(data1.resetPassword).end((err, res) => {
                if (err) {
                    console.log("resetPassword expect ==>", err);
                } else {
                    console.log("resetPassword expect ==>", res.body);
                    res.should.have.status(200);
                    done()
                }
            })
        })
    })

     /*
      * @description:test script for user-resetPassword
    */
   describe('addNote page', function () {
    let data1 = readFile();
    it('status ', function (done) {
        chai.request(server).post('/note/addNote').send(data1.addNote).end((err, res) => {
            if (err) {
                console.log("addNote expect ==>", err);
            } else {
                console.log("addNote expect ==>", res.body);
                res.should.have.status(200);
                done()
            }
        })
    })
})



})

// TO test npm test