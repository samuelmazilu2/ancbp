const express = require('express');
const RateLimit = require('express-rate-limit');
const app = express();
const forms = require('forms');
const bodyParser = require("body-parser");
const path = require('path');
const createAssessment = require('./lib/google');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'))
const { body, validationResult } = require('express-validator');
const { createNewForm } = require('./lib/data');
const logger = require('./lib/logger');

try {
  var limiter = new RateLimit({
    windowMs: 1*60*1000, // 1 minute
    max: process.env.MAX_REQUESTS_PER_MINUTE
  });
  app.get('/vcard', (req, res) => {
      const fileDirectory = path.resolve(__dirname, '.', 'public/');
      res.sendFile('vcard.vcf', {root: fileDirectory}, (err) => {
        res.end(); 
        if (err) throw(err);
      });
  });
  app.get('/health', (req, res) => res.status(200).send("ok"));
  app.post('/submit', body('name').isLength({ min: 5 }), body('email').isEmail(), body('message').isLength({min:100}), async(req, res) => {
      logger.info('Start /submit')
      //createAssessment(req.body.g_token, 'homepage', () => console.log('ok'), ()=>console.log('error'));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await createNewForm({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        location: req.body.location
      })
      res.send('Submitted Successfully!');
  });
  var server = app.listen(8080, function () {
      logger.info('Node server is running..');
  });
  
  
}
catch(ex){
  logger.error("error encountered in main loop!");
  logger.error(ex);
}
