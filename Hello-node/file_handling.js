// file handling in node 
// const fs = require("fs"); 


// fs is done for the file handling module to handle files 

// create a file 
// sync.. call
// fs.writeFileSync('./test.txt','hey there gaurav here');


//sync way
// fs.writeFileSync('./test.txt','gaurav learn node js bro')

// fs.writeFile('./test.txt','hello world',(err)=>{
//     // async way to write file .
// })

// read a file using node add readfilesync 
// const result =  fs.readFileSync('./contacts.txt','utf-8');
// console.log(result);

// const result = fs.readFile("./contacts.txt",'utf-8',(err,result)=>{
//     if(err){
//         console.log("Error",err);
//     } else{
//         console.log(result);
//     }
// });


// add append data without delete previous one.

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());


// fs.appendFile("./test.txt",`Hey There\n`,(err)=>{});

// fs.appendFileSync("./test.txt",`${Date.now()} Hey There\n`);


// delete a file
// fs.unlink("./copy.txt",(err)=>{});

// when file is created with time and details all
// console.log(fs.statSync("./test.txt").isFile())


const fs = require("fs"); 
// const readfiles =  fs.readFileSync("test.txt",'utf-8');
// const readfiles =  fs.readFileSync("contacts.txt",'utf-8');


const readfiles =  fs.writeFileSync("test.txt",'hey gaurav how are you add my data in it');
// console.log(readfiles);



