const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

console.log("Before");
request("https://www.espncricinfo.com/series/icc-women-s-world-cup-2021-22-1219028/bangladesh-women-vs-india-women-22nd-match-1243929/live-cricket-score",cb);


function cb(error, response, html) {
    if(error){
      console.error('error:', error); // Print the error if one occurred
    }
    else{
        handleHTML(html); // Print the HTML for the Google homepage.
        console.log('statusCode:', response && response.statusCode); 
    }
}

console.log("After");
function handleHTML(html){
    let selTool = cheerio.load(html);
    let player = selTool(".playerofthematch .playerofthematch-content .playerofthematch-player-detail a span");
    
    

    let playerName = selTool(player[0]).text();
    console.log(playerName);

    // let contentArray = selTool("#maincounter-wrap span");
    // // for(let i=0; i<contentArray.length; i++){
    // //     let data = selTool(contentArray[i]).text();
    // //     console.log("data : ",data);
    // // }

}