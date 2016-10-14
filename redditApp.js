var redditFunction = require('./reddit.js');
var inquirer = require('inquirer');
var prompt = require('prompt');
var permalink = require('permalinks')
const imageToAscii = require("image-to-ascii");

require('longjohn');

var frontPageMenu = ["hot", "new", "rising", "controversial", "top", "gilded", "wiki", "promoted"]

var subredditsMenu = ["FRONT", "ALL", "RANDOM", "ASKREDDIT", "FUNNY", "PICS", "GIFS",
    "TODAYILEARNED", "VIDEO", "WORLDNEWS", "GAMING", "NEWS", "AWW", "SHOWERTHOUGHTS", "MOVIES",
    "MILDLYINTERESTING", "JOKES", "TELEVISION", "TIFU", "LIFEPROTIPS", "PHOTOSHOPBATTLE"
];






var welcomeToReddit = {
    type: 'list',
    name: 'homePageSelection',
    message: 'where would you like to go?',
    choices: ['FrontPage', 'FrontPage Categories', 'SubReddit', 'SubReddit Categories', 'SubReddit list']
}

var frontPageCategories = {
    type: 'list',
    name: 'fPageCatSelection',
    message: 'What tickles your fancy today?',
    choices: ["hot", "new", "rising", "controversial", "top", "gilded", "wiki", "ads", new inquirer.Separator(), 'Go Back!', new inquirer.Separator()]
}

var subreddit = {
    type: 'list',
    name: 'subRedditSelection',
    message: 'Which subreddit will you peruse today?',
    choices: ["FRONT", "ALL", "RANDOM", "ASKREDDIT", "FUNNY", "PICS", "GIFS",
        "TODAYILEARNED", "VIDEO", "WORLDNEWS", "GAMING", "NEWS", "AWW", "SHOWERTHOUGHTS", "MOVIES",
        "MILDLYINTERESTING", "JOKES", "TELEVISION", "TIFU", "LIFEPROTIPS", "PHOTOSHOPBATTLE", new inquirer.Separator(), 'Go Back!', new inquirer.Separator()
    ],
}





////first i have my opening welcome remark
function frontPage() {
    console.log("Welcome to Reddit! the front page of the internet");
    fpMenu();


}

//next i have the user decide between the front page menu and the subreddit menu;
function fpMenu() {
    inquirer.prompt(welcomeToReddit).then(function(answers) {
        var userChoice = answers.homePageSelection;
        // redditFunction.getSortedHomepage(userChoice, function(err, result){
        //     if(err)console.log("an error has occured");
        //     else{
        if (userChoice === 'FrontPage') {
            console.log("loading...");
            frontPageChoice();
        }
        else if (userChoice === 'FrontPage Categories') {
            console.log("loading...");
            frontPgCat();
        }
        else if (userChoice === 'SubReddit') {
            console.log("loading...");
            subRed();
        }
        else if (userChoice === 'SubReddit Categories') {
            console.log("loading...");
            subRedCat();
        }
        else if(userChoice === 'SubReddit list'){
            console.log("loading...");
            subRedditList();
        }
    })

}

function frontPageChoice() {
    redditFunction.getHomepage(function(err, result) {
        if (err) console.log("an error has occured");
        else {
            chooseMenuItem(result);
        }

    })
}




function frontPgCat() {
    inquirer.prompt(frontPageCategories).then(function(answer) {
        var userChoice = answer.fPageCatSelection;
        if (userChoice === 'Go Back!') {
            frontPage();
        }
        else {
            console.log("loading...");

            redditFunction.getSortedHomepage(userChoice, function(err, result) {
                if (err) console.log("an error has occured");
                else {
                    chooseMenuItem(result)
                }
            })
        }
    })
}


function subRed() {
    inquirer.prompt(subreddit).then(function(answer) {
        var userChoice = answer.subRedditSelection;
        if (userChoice === 'Go Back!') {
            frontPage();
        }
        else {
            console.log("loading...");
            redditFunction.getSubreddit(userChoice, function(err, result) {
                if (err) console.log('an error has occured')
                else {
                    chooseMenuItem(result)

                }
            })
        }
    })
}

function subRedCat() {
    inquirer.prompt(subreddit).then(function(answer) {
        var userChoice = answer.subRedditSelection;
        if (userChoice === 'Go Back!') {
            frontPage();
        }
        else {

            inquirer.prompt(frontPageCategories).then(function(answer) {

                var catChoice = answer.fPageCatSelection;
                if (catChoice === 'Go Back!') {
                    subRedCat();
                }
                else {

                    redditFunction.getSortedSubreddit(userChoice, catChoice, function(err, result) {

                        if (err) {
                            console.log('an error hhhhhas occured');
                        }
                        else {
                            chooseMenuItem(result)
                        }
                    })
                }
            })
        }
    })
}


function subRedditList() {
    redditFunction.getSubreddits(function(err, result) {
        if (err) console.log("an error has occured");
        else {
           subRedditItem(result);
        }

    });
}







function chooseMenuItem(result) {
    var posts = []

    posts.push(new inquirer.Separator(), 'Go Back?', new inquirer.Separator());
    
    
    result.forEach(function(item) {
        

        posts.push({
            name: item.data.title,
            value: {
                title: item.data.title,
                author: item.data.author,
                score: item.data.score,
                url: item.data.url,
            }
        })
    })

    var postSelector = {
        type: 'list',
        name: 'PageContents',
        message: 'which post do you want to look at?',
        choices: posts
    }
    var goBacker = {
        type: 'list',
        name: 'backToPrevious',
        message: 'Back to previous page?',
        choices: ["Previous"]
    }

    inquirer.prompt(postSelector).then(function(selection) {
        var postPick = selection.PageContents;
        if(postPick === "Go Back?"){
            frontPage();
        }
        else{

        
         console.log('\033[2J');
         console.log(postPick.title);
         console.log(postPick.author);
         console.log(postPick.score);
        imageToAscii(postPick.url, (err, converted) => {
    console.log(err || converted);
});
         
            
            
            
            inquirer.prompt(goBacker).then(function(selection){
                if(selection.backToPrevious==="Previous"){
                    console.log('\033[2J')
                    chooseMenuItem(result);
                }
                else{
                    chooseMenuItem(result)
                };
                // inquirer.prompt(postSelector).then(function(selection){
                //     if(selection.PageContents
                    
        
                
            })
    
        }
        
    })
}
var subdingus;

function subRedditItem(result) {
    var posts = []

    posts.push(new inquirer.Separator(), 'Go Back?', new inquirer.Separator());
    
    
    result.forEach(function(item) {
        

        posts.push({
            name: item.data.title,
            value: {url: item.data.url}
                
           })
    })

    var postSelector = {
        type: 'list',
        name: 'PageContents',
        message: 'which post do you want to look at?',
        choices: posts
    }
    var goBacker = {
        type: 'list',
        name: 'backToPrevious',
        message: 'Back to previous page?',
        choices: ["Previous"]
    }

    inquirer.prompt(postSelector).then(function(selection) {
        var postPick = selection.PageContents;
        if(postPick === "Go Back?"){
            frontPage();
        }
        else{
          
            redditFunction.getSubreddit2(postPick.url,function(err,res){
                if(err)console.log('errrrrrrrrrr');
                else{
                    console.log('\033[2J')
                    chooseMenuItem(res)
                }
            })
           
            
            inquirer.prompt(goBacker).then(function(selection){
                
                if(selection.backToPrevious==="Previous")subRedditItem(result);
                    
                else{};
                // inquirer.prompt(postSelector).then(function(selection){
                //     if(selection.PageContents
            
        
                
            })
    
             
        }
    })
}


frontPage();



