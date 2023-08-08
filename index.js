const express = require('express');
const RateLimit = require('express-rate-limit');
var uuid = require('uuid');
const app = express();
const forms = require('forms');
const bodyParser = require("body-parser");
const path = require('path');
const createAssessment = require('./lib/google');
const { body, validationResult } = require('express-validator');
const { createNewForm, createNewFile, getFile } = require('./lib/data');
const multer = require('multer');
const logger = require('./lib/logger');
const { sendMail } = require('./lib/email');
const { formatFormForEmail } = require('./lib/messageFormatter');
const helmet = require('helmet')

// Use Helmet!
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://maps.googleapis.com"],
      scriptSrc: ["'self'", "https://maps.googleapis.com"],
      imgSrc: ["'self'", "https://cfriedri.ch", "https://images.unsplash.com"],
      // Add other directives as needed
    },
  })
);

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'));
try {
  var limiter = new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: process.env.MAX_REQUESTS_PER_MINUTE
  });
  app.get('/vcard', (req, res) => {
    const fileDirectory = path.resolve(__dirname, '.', 'public/');
    res.sendFile('vcard.vcf', { root: fileDirectory }, (err) => {
      res.end();
      if (err) throw (err);
    });
  });
  app.get('/health', (req, res) => res.status(200).send("ok"));
  app.get('/download/:uuid', async (req, res) => {
    try {
      // find the file in the database
      const file = getFile(req.params.uuid);
      if (!file) {
        return res.status(404).send('No file found with the given uuid');
      }

      // decode the base64 data back into binary
      const binaryData = Buffer.from(file.data, 'base64');

      // set the content-type header based on the file type
      // assuming the 'name' field in your file model contains the file name with extension
      const mimeType = require('mime-types').lookup(file.name);
      res.setHeader('Content-Type', mimeType || 'application/octet-stream');

      // set the content-disposition header so browsers handle the data correctly
      res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);

      // send the data
      res.send(binaryData);

    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  app.post('/submit',
    upload.array('files', 12),
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('phone').isMobilePhone(),
    body('message').isLength({ min: 100 }),
    async (req, res) => {
      logger.info('Start /submit')
      //createAssessment(req.body.g_token, 'homepage', () => console.log('ok'), ()=>console.log('error'));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      logger.info(req.body);
      const reqForm = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message,
        location: req.body.location,
        city: req.body.city,
        county: req.body.county,
        uuid: uuid.v1()
      };
      const form = await createNewForm(reqForm);
      if (!form.id) {
        res.send('Form creation failed!');
      }
      const filesList = [];

      for (const file of req.files) {
        const imageFile = await createNewFile({ name: file.originalname, data: file.buffer ? file.buffer.toString('base64') : '', formId: form.id });
        filesList.push(imageFile);
      }

      reqForm.files = filesList;
      reqForm.baseUrl = req.protocol + '://' + req.get('host');
      sendMail(process.env.EMAIL_TO, 'Formular nou', formatFormForEmail(reqForm));
      res.send('Va multumim!');
    });
  var server = app.listen(process.env.PORT || 3000, function () { // 8080
    logger.info('Node server is running..');
  });


}
catch (ex) {
  logger.error("error encountered in main loop!");
  logger.error(ex);
}
