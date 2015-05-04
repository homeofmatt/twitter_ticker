$(function(){

    $('#twitter-ticker').slideDown('slow');

    $.get('/loading', function(response){
    	var container = $('#tweet-container');

        // Empty the container
        $('#tweet-container').html('');

        $.each(response, function(){

        	var pic = (this.author.avatar.slice(0, 4) === "http")?this.author.avatar:"../images/window.jpg"

            var str = '	<div class="tweet">\
                        <div class="avatar"><a href="http://twitter.com/'+this.author.user_name+'" target="_blank"><img src="'+pic+'" alt="pic" /></a></div>\
                        <div class="user"><a href="http://twitter.com/'+this.author.user_name+'" target="_blank">'+this.author.user_name+'</a></div>\
                        <div class="time">'+relativeTime(this.timestamp)+'</div>\
                        <div class="txt">'+formatTwitString(this.text)+'</div>\
                        </div>';
            $('#tweet-container').append(str);
        });

    });

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

        // If posted > a day ago make pretty date string
        var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        
        var dateArr = pastTime.slice(0, 16).replace(/\T|\:/g, '-').split('-');

        dateArr[0] = (parseInt(dateArr[0])!=curDate.getFullYear())?', '+dateArr[0]:'';
        dateArr[1] = monthNames[parseInt(dateArr[1])-1];
        dateArr[2] = (parseInt(dateArr[2])).toString();
        dateArr[3] = (parseInt(dateArr[3]) > 12)?((parseInt(dateArr[3]-12)).toString()+':'+dateArr[4]+'pm'):(dateArr[3]==="00")?'12:'+dateArr[4]+'am':dateArr[3]+':'+dateArr[4]+'am';

        return dateArr[1] + ' ' + dateArr[2] + dateArr[0] + ' at ' + dateArr[3];
    }

});