$(function(){

    var container = $('#tweet-container');

    $('#twitter-ticker').slideDown('slow');

    $.get({url: 'https://social.chapman.edu/posts.json', data: {service: 'twitter', keyword: 'chapmanu'}, contentType: 'text/plain', xhrFields: {withCredentials: false}, function(response){

        // Empty the container
        container.html('');

        container.append

        $.first(response, function(){

            var str = '	<div class="tweet">\
                        <div class="avatar"><a href="http://twitter.com/'+this.author.user_name+'" target="_blank"><img src="'+this.user.avatar+'" alt="'+this.from_user+'" /></a></div>\
                        <div class="user"><a href="http://twitter.com/'+this.author.user_name+'" target="_blank">'+this.user.user_name+'</a></div>\
                        <div class="time">'+relativeTime(this.timestamp)+'</div>\
                        <div class="txt">'+formatTwitString(this.text)+'</div>\
                        </div>';

            container.append(str);

        });

    }});

    // Helper functions

    function formatTwitString(str){
        str=' '+str;
        str = str.replace(/((ftp|https?):\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?)/gm,'<a href="$1" target="_blank">$1</a>');
        str = str.replace(/([^\w])\@([\w\-]+)/gm,'$1@<a href="http://twitter.com/$2" target="_blank">$2</a>');
        str = str.replace(/([^\w])\#([\w\-]+)/gm,'$1<a href="http://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
        return str;
    }

    function relativeTime(pastTime){
        var origStamp = Date.parse(pastTime);
        var curDate = new Date();
        var currentStamp = curDate.getTime();

        var difference = parseInt((currentStamp - origStamp)/1000);

        if(difference < 0) return false;

        if(difference <= 5)				return "Just now";
        if(difference <= 20)			return "Seconds ago";
        if(difference <= 60)			return "A minute ago";
        if(difference < 3600)			return parseInt(difference/60)+" minutes ago";
        if(difference <= 1.5*3600) 		return "One hour ago";
        if(difference < 23.5*3600)		return Math.round(difference/3600)+" hours ago";
        if(difference < 1.5*24*3600)	return "One day ago";

        var dateArr = pastTime.split(' ');
        return dateArr[4].replace(/\:\d+$/,'')+' '+dateArr[2]+' '+dateArr[1]+(dateArr[3]!=curDate.getFullYear()?' '+dateArr[3]:'');
    }	

});