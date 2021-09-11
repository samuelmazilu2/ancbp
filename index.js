var express = require('express');
var app = express();
var forms = require('forms');
var bodyParser = require("body-parser");
const createAssessment = require('./lib/google');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'))
//test

// app.get('/', function (req, res) {
//     res.sendFile('./public/index.html', { root: __dirname });
// });

app.post('/submit', function (req, res) {
    createAssessment(req.body.g_token, 'homepage', () => console.log('ok'), ()=>console.log('error'));
    res.send(' Submitted Successfully!');
});

var server = app.listen(8080, function () {
    console.log('Node server is running..');
});
