
var requestJson = require('./requestJson.js').requestJson;

/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage(callback) {
  // Load reddit.com/.json and call back with the array of posts
  // TO DO: REPLACE request with requestAsJson!
  requestJson('https://reddit.com/.json', function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      try {

        callback(null, res.data.children); // look at the result and explain why we're returning .data.children
      }
      catch(err) {
        callback(err);
      }
    }
  });
}

/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod, callback) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  var sort = sortingMethod
}

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts
}

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
}

/*
This function should "return" all the popular subreddits
*/
function getSubreddits(callback) {
  // Load reddit.com/subreddits.json and call back with an array of subreddits
}

// Export the API
module.exports = {
  // ...
};

getHomepage(function(err, data){
  if(err){
    console.log("an error has occured...")
  }
  else{
    console.log(data);
  }
})

