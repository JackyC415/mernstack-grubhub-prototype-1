var assert = require('chai').assert;
var app = require('../server');
var chai = require('chai');
chai.use(require('chai-http'));
let should = chai.should();
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

//arithmetic computation to test add, sub, mul and divide.
describe('Calculator', function(){
    it('Adds two numbers', done => {
        agent.post('/calculate')
            .set('Accept', 'application/json')
            .send({"firstNum":"1", "secondNum":"2", operation:"add"})
            .end((err,res)=>{
                if(err) throw err;
                expect(res.status).to.be.equal(200);
                expect(res.body.result).to.equals('3');
                done();
            });
    });
    it('Subtracts two numbers', done => {
        agent.post('/calculate')
            .set('Accept', 'application/json')
            .send({"firstNum":"7", "secondNum":"1", operation:"sub"})
            .end((err,res)=>{
                if(err) throw err;
                expect(res.status).to.be.equal(200);
                expect(res.body.result).to.equals('6');
                done();
            });
    });
    it('Multiply two numbers', done => {
        agent.post('/calculate')
            .set('Accept', 'application/json')
            .send({"firstNum":"14", "secondNum":"2", operation:"mul"})
            .end((err,res)=>{
                if(err) throw err;
                expect(res.status).to.be.equal(200);
                expect(res.body.result).to.equals('28');
                done();
            });
    });
    it('Divides two numbers', done => {
        agent.post('/calculate')
            .set('Accept', 'application/json')
            .send({"firstNum":"5", "secondNum":"0", operation:"div"})
            .end((err,res)=>{
                if(err) throw err;
                expect(res.status).to.be.equal(200);
                expect(res.body.result).to.equals('Infinity');
                done();
            });
    });
})

//won't retrieve profile until user is logged in.
describe('Profile', function () {
    it('GET /profile', done => {    
        agent.get('/profile')
        .set('Accept', 'application/json')
        .send({"email":"JackyC415@gmail.com"})
        .end((err,res)=>{
            if(err) throw err;
            expect(res.status).to.be.equal(404);
            done();
        });
    });
})

//email already exists, fail registration
describe('Register', function () {
    it('POST /register', done => {  
        agent.post('/register')
        .set('Accept', 'application/json')
        .send({"name":"Jacky Chen", "email":"JackyC415@gmail.com", "password":"password", "restaurantname":"N/A", "zipcode":"N/A", "cuisine": "N/A",
        "phone": "N/A", "owner":false})
        .end((err,res)=>{
            if(err) throw err;
            expect(res.status).to.be.equal(404);
            done();
        });
    });
})

//wrong credential, fail login
describe('Login', function () {
    it('POST /login', done => {    
        agent.post('/login')
        .set('Accept', 'application/json')
        .send({"email":"test@test.com", "password":"blahblah"})
        .end((err,res)=>{
            if(err) throw err;
            expect(res.status).to.be.equal(404);
            done();
        });
    });
})
