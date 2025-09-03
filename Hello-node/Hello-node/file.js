const fs = require("fs");  
// fs is done for the file handling module to handle files 

// create a file 
// sync.. call
// fs.writeFileSync('./test.txt','hey there gaurav here');


//sync way
// fs.writeFileSync('./test.txt','gaurav learn node js bro')

fs.writeFile('./test.txt','hello world',(err)=>{
    // async way to write file .
})

// read a file using node add readfilesync 
// const result =  fs.readFileSync('./contacts.txt','utf-8');
// console.log(result);

const result = fs.readFile("./contacts.txt",'utf-8',(err,result)=>{
    if(err){
        console.log("Error",err);
    } else{
        console.log(result);
    }
})
