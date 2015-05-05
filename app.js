// dependencies
var path = require('path');
var request = require('request');
var express = require('express');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000

server.listen(port, function(){
	console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));

// You will need to create your own Twitter app to get your key/token information
var Twitter = require('node-tweet-stream')
	, t = new Twitter({
		consumer_key: process.env.CONSUMER_KEY,
    	consumer_secret: process.env.CONSUMER_SECRET,
    	token: process.env.USER_TOKEN,
    	token_secret: process.env.USER_TOKEN_SECRET
	});

t.track('#chapmanu');
t.on('tweet', function(tweet){
	io.emit('tweet', tweet);
})


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


// routes
app.get('/', function(req, res) {res.render('index')});

app.get('/loading', function(req, res){
	var url = "https://social.chapman.edu/posts.json?" + "service=twitter" + "&keyword=chapmanu";

	request({url: url, json: true}, function (error, response, body){
		if(!error && response.statusCode === 200){
			res.send(body);
		}else{
			console.log(error);
			res.send(error);
		}
	});
});

// http = http.createServer(app).listen(app.get('port'), function() {
//   console.log('Express server listening on port', app.get('port'));
// });