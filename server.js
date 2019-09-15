const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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

app.get('/', function(req,res) {
    res.send("To access calculator: http://localhost:3001/calculate");
})

app.post('/calculate',function(req,res){
    
    console.log("INSIDE CALCULATE");
    console.log(req.body);

    switch(req.body.operation) {
        case 'add':
            //add
            res.send({express : 'Express server is connected to React!'});
        break;
    }

});

app.listen(3001, () => console.log('Server listening on port 3001'));
