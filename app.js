//Set up requirements
var express = require("express");
var logger = require('morgan');
var errorHandler = require('errorhandler'),
var Twit = require('twit');
var Request = require('request');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

//Create an 'express' object
var app = express();
// app.use(favicon(__dirname + '/public/media/favicon.ico'));

//Some Middleware - log requests to the terminal console
app.use(logger('dev'));

//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


//port stuff
var port = process.env.PORT || 3000;
// Start the server & save it to a var
var server = app.listen(port);
//Pass the server var as an arg to the 'io' init requirement
console.log('Express started on port ' + port);

/*---------------
//DATABASE CONFIG
----------------*/
var cloudant_USER = 'INSERT CLOUNDANT USERNAME';
var cloudant_DB = 'INSERT DATABASE NAME';
var cloudant_KEY = 'INSERT CLOUDANT KEY';
var cloudant_PASSWORD = 'INSERT CLOUDANT PASSWORD';

var cloudant_URL = "https://" + cloudant_USER + ".cloudant.com/" + cloudant_DB;

/*-----
ROUTES
-----*/

//Main Page Route - NO data
app.get("/", function(req, res){
	res.render('index');
});
//Main Socket Connection
// io.on('connection', function (socket) {
//  console.log('a user connected');
// 	socket.on('sounds', function (data) {
// 		//Will send to everyone
// 		io.emit('news', data);

// 		//Will send to everyone except the sender
// 		socket.broadcast.emit('news', data);		

// 		console.log(data);
//   });
// });
//Main Page Route - WITH data requested via the client
app.get("/:word", function(req, res){
	var currentWord = req.params.word;
	var dataForThePage = {
		message: currentWord,
		search: true
	};
	res.render('index', dataForThePage);
});


//JSON Serving route
app.get("/api/:word", function(req, res){

	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");

	var currentWord = req.params.word;
	var requestURL = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + currentWord;
	requestURL = requestURL + "&api_key" + "INSET API KEY" + "&format=json&format=json";
	Request(requestURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var theData = JSON.parse(body);
			res.json(theData);
		}
	});
});


app.post("/save", function(req,res){
	console.log("A POST!!!!");
	//Get the data from the body
	var data = req.body;
	console.log(data);
	//Send the data to the db
	Request.post({
		url: cloudant_URL,
		auth: {
			user: cloudant_KEY,
			pass: cloudant_PASSWORD
		},
		json: true,
		body: data
	},
	function (error, response, body){
		if (response.statusCode == 201){
			console.log("Saved!");
			res.json(body);
		}
		else{
			console.log("Uh oh...");
			console.log("Error: " + res.statusCode);
			res.send("Something went wrong...");
		}
	});
});
//Catch All Route
app.get("*", function(req, res){
	res.send('There appears to be no website corresponding to this URL.');
});