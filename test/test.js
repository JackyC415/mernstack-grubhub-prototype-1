var assert = require('chai').assert;
var app = require('../server');

var chai = require('chai');
chai.use(require('chai-http'));
let should = chai.should();
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Calculator', function(){
    it('Adds two numbers', done => {
        agent.post('/calculate')
            .set('Accept', 'application/json')
            .send({"firstNum":"1", "secondNum":"2", operation:"add"})
            .end((err,res)=>{
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
                expect(res.status).to.be.equal(200);
                expect(res.body.result).to.equals('Infinity');
                done();
            });
    });
})

describe('Search', function () {
    it('POST /searchItem', function () {    
        agent.post('/searchItem')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
            });
    });
})