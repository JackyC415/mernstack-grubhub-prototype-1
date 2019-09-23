/*References: 
https://www.w3schools.com/nodejs/nodejs_mysql_create_db.asp 
*/
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

    const firstNum = parseInt(req.body.firstNum);
    const secondNum = parseInt(req.body.secondNum);

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

app.listen(3001, () => console.log('Server listening on port 3001'));
