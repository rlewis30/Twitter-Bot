console.log("The bot is starting");
var Twit=require('twit');
var config=require('./config.js');
//var r=Math.floor(Math.random()*1000000);

var TwitApp = new Twit(config);

var userStream=TwitApp.stream('user'); // this opens up a user stream

userStream.on('follow',followed); // this listens for a follow event
userStream.on('tweet', tweetEvent); //this listens for a mention event
//****************************************Function Area**************************************************************
/*
This function provides the text and json information to post a Tweet
*/
function followed(eventMsg)
{
  var r=Math.floor(Math.random()*100000000000)
  var name=eventMsg.source.name;
  var screenName=eventMsg.source.screen_name;
  post('@'+screenName+' thanks for following! Mention me for a pseudo-random number! Case '+r);
}

/*
This is the call back function for the follow event
*/

function post(txt)
{
  var tweet ={
    status: txt
  }

  TwitApp.post('statuses/update',tweet,sentTweet);

  function sentTweet(err,data,response)
  {
    if(err)
    {
        console.log(err);
    }
    else
    {
      console.log("It worked!");
    }
  }

}

function tweetEvent(eventMsg)
{
  var replyto=eventMsg.in_reply_to_screen_name;
  var text=eventMsg.text;
  var from=eventMsg.user.screen_name;
  var account_name=require('./account_name');

  if(replyto===account_name.account_name)
  {
    var r=Math.floor(Math.random()*100000000000);
    var createdTweet='@'+from+' your number is '+r;
    post(createdTweet);
  }
}
