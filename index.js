var express = require('express');
var app = express();

function getJSON(callback) {
	var request = require("request");

	var url = "https://social.chapman.edu/posts.json?" + "service=twitter" + "&keyword=chapmanu";

	request({
		url: url,
		json: true
	}, function (error, response, body){
		if(!error && response.statusCode === 200){
			//console.log(body);
			callback(body);
		}else{
			console.log(error);
		}
	});
}

app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	getJSON(function(data){
		response.json(data);
	});
  	//response.send(data);
  //response.render('public/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});