var express = require('express'),
	cors = require('cors'),
	app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    crypto = require('crypto'),
    morgan = require('morgan'),
    
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    http = require('http'),
	request = require('request'),
    qs = require('querystring'),
    path = require('path'),
    _ = require('lodash');


app.use(bodyParser.urlencoded({ extended: true, limit:'99mb' }));
app.use(bodyParser.json({limit:'99mb'}));
app.use(expressValidator({
	customValidators:{
		objectExists: (input, object) => {
			if( typeof input[object] !== 'undefined' ) {
				return true;
			}
			return false;
		}
	}
}));
// use morgan to log requests to the console
app.use(morgan('dev'));

require('ssl-root-cas').inject();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

var routes = require('./routes');
routes(app);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log('torre_test_api webServices starts at port: ' + port);
