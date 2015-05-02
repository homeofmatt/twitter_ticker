exports.getTwitterJSON = function() {
	var request = require("request");

	var url = "https://social.chapman.edu/posts.json?" + "service=twitter" + "&keyword=chapmanu";

	request({
		url: url,
		json: true
	}, function (error, response, body){
		if(!error && response.statusCode === 200){
			//console.log(body);
			return body;
		}
	});
}