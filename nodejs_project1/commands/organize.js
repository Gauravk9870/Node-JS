let fs = require("fs");
let path = require("path");


function organizeFn(dirPath){

    // 1. Get the input -> directory path
    // 2. create -> "OrganizedFiles" named directory
    // 3. identify categories of all the files in that given directory
    // 4. Copy/Cut files to that organized directory inside of any of category folder

    let destPath ; // path of new Organized directory
    if(dirPath == undefined){
        // if path is not given
        // console.log(chalk.red.bold("Kindly Enter the path"));
        destPath = process.cwd();
        return;
    }
    else{
        // if given then check is it exist or not 
        let doesExist = (fs.existsSync(dirPath));
        
        // if directory path exits 
        if(doesExist){
            destPath = path.join(dirPath,"OrganizedFile");// its only path folder is not created yet

            // // First check is this directory already exits or not 
            if(fs.existsSync(destPath) == false){
                // it only created if the directory is not already exits 
                fs.mkdirSync(destPath);
                console.log(destPath);
                console.log(("Folder created Successfully"));

            }
            else{
                console.log(("Already exits"));
            }

        }
        // if directory path not exits 
        else{
            console.log(("Please Enter correct Path"));
            return;
        }


    }
    // Now Directory Created 
    // its time to identify categories of all the files in that given Directory 

    // we make another function to handle the remaining work like identifying the files and then copy it to destination directory 
    organizeHelper(dirPath,destPath); //given directory and destination directory

}


function organizeHelper(dirPath, destPath){
    // Identify categories of all the files in the given directory 
    // so we have to read the given directory 
    let filenames = fs.readdirSync(dirPath); //it gives the filename
    console.log(filenames); // we got all the files in the given directory
    
    // accessing each file using loop 
    for(let i=0; i<filenames.length; i++){
        // making address for each filenames
        let fileAddress = path.join(dirPath,filenames[i]);

        // now check is it a file or folder in the directory 
        let isFile = fs.lstatSync(fileAddress).isFile();

        // if it is a file 
        if(isFile){
            // then check its cateorgy wether it is document fileAddress, media file or any other type of file 
            
            // so we have to make function to identify categories 
            let category = getCategory(filenames[i]);
            // Now we get our categories 
            console.log(category);
            // Now we know which type of files  we have
            // Now we have to send or group this files according to its type or category
            sendFiles(fileAddress, destPath, category);
        }

    }
}

function getCategory(fileNames){
    // so we have to find the extension of the file 
    let ext = path.extname(fileNames);
    ext = ext.slice(1);

    // comparing the file extensions with our object which contain all the extensions according to file extensions
    for(let fileExt in Filetypes){
        // it gives the types of categories we have 
        let categoryType = Filetypes[fileExt];
        // get deep inside in categoryType to find our extensions
        for(let i=0; i<categoryType.length; i++){
            if(ext == categoryType[i]){
                return fileExt;
            }
        }
    }
    return "Others";
}

function sendFiles(srcFilePath,dest,category){
    // this gives the category address or path 
    let categoryPath = path.join(dest,category);
    // now we have the path for our category
    // first check path already exits or not
    if(fs.existsSync(categoryPath)==false){
        // if its not exits then make it 
        fs.mkdirSync(categoryPath);
        // now we have all the folders of all types of categories 
    }
    // now we have to put the files according to its type in each category 
    let fileName = path.basename(srcFilePath);//it give the name of individual file
    // after that now copy this files to destFilePath
    let destFilePath = path.join(categoryPath,fileName);
    // after we have paths of files in category
    // start copying the file from src to dest
    fs.copyFileSync(srcFilePath,destFilePath);
    // After copying delete the original file 
    fs.unlinkSync(srcFilePath);
    console.log((fileName," copied to ",category));

}

module.exports ={
    organizeKey:organizeFn
}