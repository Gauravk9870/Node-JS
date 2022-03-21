let fs = require("fs");
let path = require("path");

function treeFn(dirPath){
    if(dirPath == undefined){
        // if path is not given
        // console.log(chalk.red.bold("Kindly Enter the path"));
        treehelper(process.cwd(), ""); //it picks the current working directory
        return;
    }
    else{
        // if given then check is it exist or not 
        let doesExist = (fs.existsSync(dirPath));
        
        // if directory path exits 
        if(doesExist){
            treehelper(dirPath,"");
        }
        // if directory path not exits 
        else{
            console.log(("Please Enter correct Path"));
            return;
        }
    }
}

function treehelper(dirPath,indent){
    //is file or folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile){
        let filename = path.basename(dirPath);
        console.log((indent + "├──" +filename))
    }
    else{
        let dirName = path.basename(dirPath);
        console.log((indent + "└──" + dirName));
        let childrens = fs.readdirSync(dirPath);
        for(let i=0; i<childrens.length; i++){
            let childPath = path.join(dirPath,childrens[i]);
            treehelper(childPath,indent + "\t");
        }
    }
}

module.exports ={
    treeKey:treeFn
}