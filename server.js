const express = require('express');
const app = express();

app.listen(3001, () => console.log('Server listening on port 3001'));

app.get('/express_backend', (req,res) => {
    res.send({express : 'Express server is connected to React!'});
})