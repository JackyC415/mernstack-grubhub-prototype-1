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


app.get('/grubhub', function(req,res) {
    console.log("INSIDE GRUBHUB");
});

app.post('/calculate',function(req,res){
    
    console.log("INSIDE CALCULATE");
    console.log(req.body);

    switch(req.body.operation) {
        case "add": 
            var add = parseInt(req.body.firstNum) + parseInt(req.body.secondNum);
            res.status(200).send(JSON.stringify(add));
        break;
        case "sub":
            var sub = parseInt(req.body.firstNum) - parseInt(req.body.secondNum);
            res.status(200).send(JSON.stringify(sub));
        break;
        case "mul": 
            var mul = parseInt(req.body.firstNum) * parseInt(req.body.secondNum);
            res.send(JSON.stringify(mul));
        break;
        case "div": 
            var div = parseInt(req.body.firstNum) / parseInt(req.body.secondNum);
            res.send(JSON.stringify(div));
        break;
        default: 
            res.status(404).send(null);
    }

});

app.listen(3001, () => console.log('Server listening on port 3001'));
