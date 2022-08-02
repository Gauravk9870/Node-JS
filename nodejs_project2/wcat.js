#!/usr/bin/env node


let fs = require('fs');

let inputArr = process.argv.slice(2); //input

// for options 
let optionsArr = [];
let filesArr = [];

// indentify -> Options wether it is a file or commands
for(let i=0; i<inputArr.length; i++){
    // it gives the 0th index element means "-"
    // which is used for commands 
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        optionsArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}

// if -n and -b are 2 options available together then command should give you an error
// first check options 
let isBothPresent =optionsArr.includes("-n")&&optionsArr.includes("-b");
if(isBothPresent){
    console.log("Either enter -n or -b option");
    return;
}

// check existence of file
for(let i=0; i<filesArr.length; i++){
    let isPresent = fs.existsSync(filesArr[i]);
    if(isPresent == false){
        console.log(`file ${filesArr[i]} is not Present!`);
        return;
    }
}


//Read
let content = "";
for(let i=0; i<filesArr.length; i++){
    let bufferContent = fs.readFileSync(filesArr[i]);
    content+=bufferContent+"\r\n";
}
// console.log(content);

let contentArr = content.split("\r\n");
// console.log(contentArr);


// 3. wcat -s filepath => convert big line breaks into a singular line break 
// first check options for "-s"
// is "-s" is present in optionsArr or not 

let isSpresent = optionsArr.includes("-s");
// console.log(isSpresent)
if(isSpresent == true){
    for(let i=1; i<contentArr.length; i++){
        if(contentArr[i] == '' && contentArr[i-1] == ''){
            contentArr[i] = null;
            // console.log(contentArr[i]);
        }
        else if(contentArr[i] == '' && contentArr[i-1]==null){
            contentArr[i] = null;
            // console.log(contentArr[i]);
        }
    }
    
    // save the lines which don't have the null values 
    let tempArr=[];
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }

    // put the not null lines in contentArr
    contentArr = tempArr;
}
console.log("----------------------------------");
// console.log(contentArr.join("\n"));


// 4- wcat -n filepath => give numbering to all the lines
// check for "-n" in optionsArr
let isNpresent = optionsArr.includes("-n");
if(isNpresent){
    for(let i=0; i<contentArr.length; i++){
        contentArr[i] = `${i+1} ${contentArr[i]}`;
        i++;
    }
}
// console.log(contentArr.join("\n"));


// 5- wcat -b filepath => give numbering to non-empty lines

let isBpresent = optionsArr.includes("-b");
if(isBpresent){
    let counter =1;
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != ""){
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}
console.log(contentArr.join("\n"));