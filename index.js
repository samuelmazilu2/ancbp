const express = require('express');
const RateLimit = require('express-rate-limit');
const app = express();
const forms = require('forms');
const bodyParser = require("body-parser");
const path = require('path');
const createAssessment = require('./lib/google');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'))

var limiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 60
});
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

