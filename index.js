var express = require('express');
var app = express();
var forms = require('forms');
var bodyParser = require("body-parser");
const createAssessment = require('./lib/google');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'))

app.get('/vcard', (req, res) => {
    const fileDirectory = path.resolve(__dirname, '.', 'public/');

    res.sendFile('vcard.vcf', {root: fileDirectory}, (err) => {
      res.end();
  
      if (err) throw(err);
    });
});
app.post('/submit', function (req, res) {
    createAssessment(req.body.g_token, 'homepage', () => console.log('ok'), ()=>console.log('error'));
    res.send(' Submitted Successfully!');
});
var server = app.listen(8080, function () {
    console.log('Node server is running..');
});

