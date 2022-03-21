#!/usr/bin/env node

let fs = require("fs");
let input = process.argv.slice(2); //we get two things command and path
let command = input[0];

// let chalk = require("chalk");
let path = require("path");
const { getEnabledCategories } = require("trace_events");

let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");

let Filetypes = {
    media : ["mp4","mkv"],
    archive : ["zip","7z","rar","gz","ar","iso","xz"],
    documents : ["docx","dox","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex"],
    app : ["exe","pfg","deb"],
    images : ["jpg","png","svg","jpeg"]
}

switch(command){
    case "tree":
        treeObj.treeKey(input[1]);
        break;
    case "organize":
        organizeObj.organizekey(input[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log(("Please Enter valid command !"));
}

