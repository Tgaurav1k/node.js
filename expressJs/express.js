// import http for creating web server
const  http = require("http");
const fs = require("fs");
const url = require("url");
const { verify } = require("crypto");
// import express as it will be must 
const express = require("express");



const app = express();
// request for url
app.get("/", (req,res) =>{
  return res.send(`Hello ${req.query.name} from Home Page`)
} );

app.get("/about", (req,res) =>{
  return res.send("Hello from about page" + "hey"+req.query.name+ " & i am " + req.query.age +  "years old" );
} );

// we can direct write 

app.listen(8000, () =>{
  console.log("Server Started")
});


// const myMainServer = http.createServer(app);

// myMainServer.listen(8000, () =>console.log("Server Started")
// )      