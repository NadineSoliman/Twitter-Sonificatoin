# Twitter-Sonificatoin
A web app that allows you to tune in to a Twitter hashtag and in realtime use the data from the tweets to compose a musical piece. 

## The Twit API

Twit API In this project, I utilized the Twit API which is built upon the Twitter API. The Twit API is both a REST and streaming API for node. REST APIs are mostly what we had to deal with in this class, and they are APIS that function in a request and response fashion. Basically, the client sends a request, and the server responds with a single Response in the form of JSON/ XML/ HTML file. Streaming APIs allow you to send a request, and the server will keep responding to the request in real time, and as the data is being updated, the new added information will be sent to the client. This is specially useful for the Twitter API, as you can stream tweets as the come in, and have the data be constantly updated as your web app is running. In this project, even though it could be more ideal to utilize the streaming API, to have more control over the timing when the data is being received by my server, I employ the REST API, and send requests periodically. This was more appropriate as I first needed to analyze the tweets I am receiving and play the corresponding sound, therefore the instant updating was not needed in this case. 

## How to use the API

Twit is actually a pretty fun API to work with, and I totally encourage everyone to play around with it. To get started with Twit, you have to first authenticate your app on twitter through a user account. In this process you obtain a consumer key, a consumer secret, an access token, and an access token secret. Once you have these authentication variables setup in your node code, you are ready to begin making GET and POST requests to the API. And, the API allows you access to a lot of twitter information and other twitter functionalities. For instance, you can tweet on behalf of the account linked to the app, and you can also search for tweets that contain certain characters. There are various other ways of filtering the data being received, such as only reicieving tweets from within a specific longitude/latitude region, or tweets from a certain date.

## How the app works

The app is built using node express for server side development, and the Twit requests are developed using node as mentioned above. However, after the API responses are received, all the work is done on the client side. I send a request to receive about the 20 most recent tweets with a given hashtag that the user inputs. The hashtag that was inputted is then saved to an IBM Cloud database, to keep track of all the hashtags that people have been looking up. to display Then the algorithm, selects one of these tweets randomly, displays it on the page, and iterates through all the characters, and maps each character to a number. Afterwards, each number is mapped to a piano note, that is played in the corresponding order of characters. The sonification process is done through P5, which is used to preload and play the music files. This process is then repeated at a specific time interval of about 5-10 seconds. As the tweets selected are randomized, it is very unlikely to get the same tweet two times in a row. 

## Things to add 
In the near future, I would like to add more affordances to the page. This includes adding the option of also including a visual representation of the characters in the tweets that match the audio representations. In addition to that, it would also be cool to give the user the option of selecting the kind of instrument that they would like to map the tweets to. Further, I look to utilize more of the parameters that the API provides, such as how popular the user that tweeted the tweet with the hashtag is, their geographical location, how many times the tweet was retweeted and so on. This will aim in adding more levels of sonification to the algorithm, and complexity to the user experience. I would also like to add more affordances to the displayed tweet on the page. This could be done by highlighting the specific characters that are being sonified at the moment, and thus adding a connection to the text aspect and sonification aspect of the project.

## LINKS TO THE DEPLOYED PROJECT:
https://finalmashups.herokuapp.com

https://finalmashups.herokuapp.com/about
