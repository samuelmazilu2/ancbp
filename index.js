var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
//test
app.get('/', function (req, res) {
    var forms = require('forms');
    var fields = forms.fields;
    var validators = forms.validators;

    var reg_form = forms.create({
        username: fields.string({ required: true }),
        password: fields.password({ required: validators.required('You definitely want a password') }),
        confirm:  fields.password({
            required: validators.required('don\'t you know your own password?'),
            validators: [validators.matchField('password')]
        }),
        email: fields.email()
    });
    res.send(reg_form.toHTML());
});

app.post('/submit-student-data', function (req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName;
    
    res.send(name + ' Submitted Successfully!');
});

var server = app.listen(8080, function () {
    console.log('Node server is running..');
});
