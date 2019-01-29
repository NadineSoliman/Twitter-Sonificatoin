var $theH2;
var searchTwitter;
var delay = 20000;
var sonification = [];

function makeTwitterSearchRequest(hashtag, previousTweet){
	$.ajax({
		url: '/search/' + hashtag,
		type: 'GET',
		dataType: 'JSON',
		error: function(err){
			console.log(err);
		},
		success: function(data){
			// console.log(data);
			var theTweet = data.tweet || 'Waiting...';
			$theH2.empty();
			$theH2.html(theTweet);
			var previous = theTweet;
			sonify(theTweet, sonification);
			console.log(theTweet);
			setTimeout(function(){
				makeTwitterSearchRequest(hashtag, previous);
			}, delay);
		}
	});
}

function sonify(tweet, array){
	for(var i = 0; i<tweet.length; i++){
		char = tweet.charCodeAt(i)%7;
		array.push(char);}
}

var sounds = []

function preload(){
	song1 = loadSound('do.wav');
	song2 = loadSound('re.wav');
	song3 = loadSound('mi.wav');
	song4 = loadSound('fa.wav');
	song5 = loadSound('sol.wav');
	song6 = loadSound('La.wav');
	song7 = loadSound('si.wav');

	sounds = [song1,song2, song3, song4, song5, song6, song7];

}
var i = 0;

function setup(){
	frameRate(5);
}
function draw(){
	if(i<sonification.length){
	var toBePlayed = sounds[sonification[i]];
	toBePlayed.play();
	i++;
	}
}

function saveData(obj){
	$.ajax({
		url: '/save',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(obj),
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('saving!');
			// console.log(resp);
		}
	});
}

var topResultsArray = []
function getData(topResults){
	$.ajax({
		url: '/api/all',
		type: 'GET',
		contentType: 'json',
		error: function(data){
	      console.log("We got problems");
	      console.log(data.status);
		    },
	    success: function(data){
	    	for(var i= 0; i<topResults; i++){
	    		topResultsArray.push(data[i].doc.data);
	    	}
			console.log(topResultsArray);
			for(var i=0; i<topResultsArray.length;i++){
				$top.append(topResultsArray[i] + '<br>');
	}
	      }
});
}
$('document').ready(function(){
	$top =$('#popular');
	getData(5);

	$("#button").click(function(){
	console.log("The button was Pressed!");
	var theInput = $('#input').val();
	if(theInput.length>0){
	$theH2 = $('#tweetText');
	$theH2.html("Waiting for Tweets");
	var toSave = {data: theInput}
	saveData(toSave);
	makeTwitterSearchRequest(theInput);}})
});