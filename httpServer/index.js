// import http for creating web server
const  http = require("http");

// create web server
const myServer = http.createServer((req,res)=>{
  console.log("New req recorded");
  res.end("Hello from server");
});
