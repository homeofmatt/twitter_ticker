//var routes = require('./routes');
//var user = require('./routes/user');

// dependencies
var http = require('http');
var path = require('path');
var request = require('request');
var express = require('express');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());

// development only
if('development' == app.get('env')){
	app.use(errorHandler());
}

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', function(req, res) {res.render('index')});

app.get('/loading', function(req, res){
	var url = "https://social.chapman.edu/posts.json?" + "service=twitter" + "&keyword=chapmanu";

	request({url: url, json: true}, function (error, response, body){
		if(!error && response.statusCode === 200){
			//console.log(body);
			res.send(body);
		}else{
			console.log(error);
			res.send(error);
		}
	});
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port', app.get('port'));
});