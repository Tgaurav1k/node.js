// import http for creating web server
const  http = require("http");
const fs = require("fs");
const url = require("url");
const { verify } = require("crypto");

// create web server
const myServer = http.createServer((req,res)=>{
   if(req.url === "/favicon.ico" ) return res.end();
   const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
   const myUrl = url.parse(req.url, true);
  // console.log(myUrl);
  fs.appendFile("httpReqData.txt",log, (err,data)=>{
    switch (myUrl.pathname){
      case "/":
        // req for get 
        if(req.method === "GET")
        res.end("Home Page")
        break;
        case "/about":
          const userName = myUrl.query.myName;
          res.end(`Hi, ${userName}`);
          break;
        case "/search":
       const search = myUrl.query.search_query;   
        res.end("Here are the result for"+ search);
        case '/signup':
        if(req.method === 'GET')
          res.end("This is a signup Form");
        else if ( req.method=== "POST"){
          // DB query run 
          res.end("Success");
        }
        default:
          res.end("404 Not Found");

    }
  });
});

myServer.listen(8000, ()=>console.log("server started"))