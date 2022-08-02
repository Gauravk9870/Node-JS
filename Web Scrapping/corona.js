const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');

console.log("Before");
request('https://www.worldometers.info/coronavirus/',cb);


function cb(error, response, html) {
    if(error){
      console.error('error:', error); // Print the error if one occurred
    }
    else{
        handleHTML(html); // Print the HTML for the Google homepage.
    }
}

console.log("After");
function handleHTML(html){
    let selTool = cheerio.load(html);
    // let h1s = selTool("h1");
    // console.log(h1s.length);

    let contentArray = selTool("#maincounter-wrap span");
    // for(let i=0; i<contentArray.length; i++){
    //     let data = selTool(contentArray[i]).text();
    //     console.log("data : ",data);
    // }

    let total = selTool(contentArray[0]).text();
    let deaths = selTool(contentArray[1]).text();
    let recovered = selTool(contentArray[2]).text();

    console.log(chalk.blue("Total Cases : "+total));
    console.log(chalk.red("Total Deaths : "+deaths));
    console.log(chalk.green("Total Recovered : "+recovered));
}