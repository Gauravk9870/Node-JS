# File Organizing System #

#### File Organizing System is a type of system which organize all the different kinds of files in a Directory. In this system all the files having the same extension are grouped together in a new sub directory which help in organizing and managing all the files having different types separately. ####



### Perquisites: File System Module in Node js.

**For Files:**

**1. Read a JavaScript file / any kind of file:**

    `Let fs = require(“fs”);`

    `Let buffer = fs.readFileSync(“filename.extension”);`

**2. Open a File:**

    `Let buffer = fs.openSync(“filename.ext”, “w”);`

**3. Write File:**

    ***• If file is not exits then it will create a new File.***

    ***• If there is already a file exits and having content then it replace the content***

    `Fs.writeFileSync(“filename.ext”, “Writing in file”);`

**4. Update File:**

    `Fs.appendFileSync(“filename.ext”, “Updating in File”);`

**For Directories:**

**5. Create a Directory**

    `Fs.mkdirSync(“FolderName”);`

**6. Write in File using Directory :**

    `Fs.wirteFileSync(“foldername/filename.ext”, “This file is created using javaScript”);`

**7. Delete files from folder:**

    ***• First read the directory***

    ***• Then delete the files.***

    `Let content = fs.readdirSync(“FolderName”);`

    ***Deleting all files using Loop***

    `For(let i=0; i<content.length; i++)`

    `{`

    `Fs.unlinkSync(“folderName/content[i]);`

    `}`

**8. Delete a Directory :**

    `Fs.rmdirSync(“FolderName”);`

**9. Check Directory exits or not:**

     ***if a file exits at path -> True or False***
     
    `Fs.exitsSync(“folderName”)`

**10. Check is this is Path of a Directory or a File:**

    ***it returns object and then we have to call some functions.***

    `Let x = fs.lstatSync(__dirname + “Foldername”);`
    
    `Let result = x.isFile();` *is it a File path?*

    `Let result = x.isDirectory();` *is it a Directory path?*


## How we are going to Do this

**1. Get the input -> Directory Path**

**2. Create -> “ OrganizedFiles” directory**

**3. Identify categories of all the files in that given Directory**

**4. Copy or Cut files to that organized directory inside of any of category folder**
