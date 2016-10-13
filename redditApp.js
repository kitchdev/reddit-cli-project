var redditFunction = require('./reddit.js');
var inquirer = require('inquirer');

var frontPageMenu = ["hot", "new", "rising", "controversial","top","gilded","wiki","promoted"]

var subredditsMenu = ["FRONT", "ALL", "RANDOM", "ASKREDDIT", "FUNNY", "PICS", "GIFS",
"TODAYILEARNED", "VIDEO", "WORLDNEWS", "GAMING","NEWS","AWW","SHOWERTHOUGHTS","MOVIES",
"MILDLYINTERESTING", "JOKES","TELEVISION", "TIFU", "LIFEPROTIPS", "PHOTOSHOPBATTLE"];

var userChoiceSubRed;
var userChoiceFrontPg;

var welcomeToReddit = {
    type: 'list',
    name: 'menu or subreddit',
    message: 'where would you like to go?',
    choices: ['frontPageMenu', 'subredditsMenu']
}

var chooseMenu = {
    type: 'list',
    name: 'menu list',
    message: 'What tickles your fancy today?',
    choices: [frontPageMenu]
}
    
    ////first i have my opening welcome remark
function frontPage(){
    console.log("Welcome to Reddit! the front page of the internet");
    setTimeout(function() {
        frontPageChoice()
    }, 1000);
        
    }

//next i have the user decide between the front page menu and the subreddit menu;
function frontPageChoice(){
    inquirer.prompt(welcomeToReddit).then(function(answers){
        if(answers['menu or subreddit'] === frontPageMenu){
             console.log(frontPageMenu);
            }
            else{
                console.log(subredditsMenu);
                
             chooseMenuItem()

            }
    })
}

// function chooseMenuItem(){
//     inquirer.prompt(chooseMenu).then(function(userInput){
//         console.log(frontPageMenu);
//         var choice = userInput["What tickles your fancy today?"];
//         if(choice){
//             console.log("GOOD CHOICE BUT I DONT KNOW HOW TO LINK YOU ANYWHERE YET")
//         }
//     })
// }

function chooseMenuItem(){
    prompt.get("Where do you want to go now?", function(err, userInput){
        if(err){
            console.log("an error has occured");
        }
            else{
                userInput
            }
    }
})
//now with the options in front of them, i want them pick a menu option 
// of either the main or subreddit that will lead them to the corresponding
//page of links.
// console.log(redditFunction.getHomepage(frontPageMenu[0]));

frontPage();