var express = require('express');
var app = express();
var forms = require('forms');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'))
//test

// app.get('/', function (req, res) {
//     res.sendFile('./public/index.html', { root: __dirname });
// });

app.post('/submit-student-data', function (req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName;
    
    res.send(name + ' Submitted Successfully!');
});

var server = app.listen(8080, function () {
    console.log('Node server is running..');
});
