const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors');
app.set('view engine', 'ejs');
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'lab1DB'
});

connection.connect((err) => {

    if(!err)
        console.log('Database is connected!');
    else
        console.log('Database not connected!');
});

app.post('/calculate', (req,res) => {

    console.log("INSIDE CALCULATE");
    console.log(req.body);

    var firstNum = parseInt(req.body.firstNum);
    var secondNum = parseInt(req.body.secondNum);

    switch(req.body.operation) {
        case "add": 
            res.status(200).send(JSON.stringify(firstNum + secondNum));
        break;
        case "sub":
            res.status(200).send(JSON.stringify(firstNum - secondNum));
        break;
        case "mul": 
            res.status(200).send(JSON.stringify(firstNum * secondNum));
        break;
        case "div": 
            var ans = (secondNum != 0 ? JSON.stringify(firstNum/secondNum) : 'Infinity');
            res.status(200).send(ans);
        break;
        default: 
            res.status(404).send(null);
    }

});

app.post('/register', (req,res) => {
    console.log("INSIDE REGISTER");
    console.log(req.body);

    if(req.body.owner) {
        connection.query("INSERT INTO register (name, email, password) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"')", (req,res) => {
            if (err) throw err;
                console.log("Inserted user data!");
            res.end();
        });
    } else {
        connection.query("INSERT INTO register (name, email, password, restaurantname, zipcode) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"','"+req.body.restaurantname+"','"+req.body.zipcode+"')", (req,res) => {
            if (err) throw err;
                console.log("Inserted owner data!");
            res.end();
        });
    }
});

app.post('/login', (req, res) => {
    console.log("INSIDE LOGIN");
    console.log(req.body);

    //default scenario
    if(req.body.name == "admin" && req.body.password == "admin") 
        console.log('redirecting...');
    //query database to validate credential
});

app.listen(3001, () => console.log('Server listening on port 3001'));