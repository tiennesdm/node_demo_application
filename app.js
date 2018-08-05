var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const nodemailer = require('nodemailer');

var port = 3000;

var app = express();


app.use(function(req, res, next){
	console.log('Time: ', Date.now());
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/about',function(req,res){
res.render('about');
});
app.get('/',function(req,res){
res.render('index');
});
app.get('/contact',function(req,res){
res.render('contact');
});
app.post('/contact', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
			user: 'shubham.conceptualise@gmail.com',
			pass:'*************'
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to:'shubham.conceptualise@gmail.com',
    subject: 'New message from contact form at demo',
    text: `${req.body.name},${req.body.surname},${req.body.need}, (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('contact-failure');
    }
    else {

      res.render('index');

    }
  });
});




app.listen(port);
console.log('Server started on port '+port);

module.exports = app;
