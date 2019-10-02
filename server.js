//References: CMPE273 ReactHW, Prof. Shim, Fall 2019.
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const Joi = require('@hapi/joi');
const mysql = require('mysql');
const http = require('http');

app.set('view engine', 'ejs');
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_lab1_secret',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

//initialize database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'lab1DB'
});

//connect to mySQL and create tables
connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL database connected!');
    var registerSQL = "CREATE TABLE IF NOT EXISTS users(id INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, restaurantname VARCHAR(255) NOT NULL, zipcode VARCHAR(100) NOT NULL, owner BOOLEAN)";
    connection.query(registerSQL, function (err, result) {
        if (err) throw err;
        console.log("User table created!");
    });

});

app.post('/calculate', (req, res) => {

    console.log("INSIDE CALCULATE");
    console.log(req.body);

    var firstNum = parseInt(req.body.firstNum);
    var secondNum = parseInt(req.body.secondNum);

    switch (req.body.operation) {
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
            var ans = (secondNum != 0 ? JSON.stringify(firstNum / secondNum) : 'Infinity');
            res.status(200).send(ans);
            break;
        default:
            res.status(404).send(null);
    }

});

app.post('/register', (req, res) => {

    console.log("INSIDE REGISTER");

    //input validation with joi
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(6).max(16).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
        restaurantname: Joi.string().max(30),
        zipcode: Joi.string().max(5)
    });

    if (!req.session.isLoggedIn) {
        const { error, value } = schema.validate({ name: req.body.name, email: req.body.email, password: req.body.password, restaurantname: req.body.restaurantname, zipcode: req.body.zipcode });
        if (error) {
            console.log(error);
            res.send('Invalid inputs!');
        } else {
            let checkEmail = "SELECT email FROM users WHERE email = ?";
            connection.query(checkEmail, [req.body.email], (err, results) => {
                if (err) {
                    throw err;
                } else if (results.length > 0) {
                    res.send('User already exists!');
                } else {
                    console.log(value);
                    let userSQL = "INSERT INTO users " + "SET name = ?, email = ?, password = ?, restaurantname = ?, zipcode = ?, owner = ?";
                    connection.query(userSQL, [req.body.name, req.body.email, req.body.password, req.body.restaurantname, req.body.zipcode, req.body.owner]);
                    res.send('Registered successfully!');
                }
            });
        }
    } else {
        console.log("Can't register when user is logged in.");
    }
});


app.post('/login', (req, res) => {
    console.log("INSIDE LOGIN");

    const schema = Joi.object({
        email: Joi.string().lowercase().trim().email().required(),
        password: Joi.string().min(6).max(16).pattern(/^[a-zA-Z0-9]{3,30}$/).required()
    });

    const { error, value } = schema.validate({ email: req.body.email, password: req.body.password });
    if (error) {
        throw error;
    } else {
        console.log(value);
        var authSQL = "SELECT * FROM users WHERE email = ? AND password = ?";
        connection.query(authSQL, [req.body.email, req.body.password], (err, results) => {
            if (err) {
                throw err;
            } else if (results.length > 0) {
                console.log(typeof results[0].owner);
                if (results[0].owner == 0) {
                    res.cookie('cookie', "buyer", { maxAge: 900000, httpOnly: false, path: '/' });
                } else {
                    res.cookie('cookie', "owner", { maxAge: 900000, httpOnly: false, path: '/' });
                }
                req.session.name = results[0].name;
                req.session.isLoggedIn = true;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("Successful Login!");
            } else {
                console.log("Invalid credentials!");
                res.sendStatus(404);
            }
        });
    }

});

app.post('/profile', (req, res) => {
    if (req.session.isLoggedIn) {
        var profileSQL = "SELECT * FROM users WHERE name = ?";
        connection.query(profileSQL, [req.session.name], (err, results) => {
            if (err) {
                throw err;
            } else if (results.length > 0) {
                res.send(results);
            } else {
                console.log("Can't find user!");
            }
        });
    } else {
        console.log("Please log in first!");
    }
});

app.post('/searchItem' , (req,res) => {
    //query database for item
    console.log(req.body.item);
    res.sendStatus(200);
})

app.listen(3001, () => console.log('Server listening on port 3001'));