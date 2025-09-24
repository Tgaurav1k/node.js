const express = require("express")
const app = express()
const port = 3000

app.get("/", (req,res)=>{
    res.send("Hello world of gaurav")
})

app.listen(port, ()=>{
    console.log(` Server started & this is on port ${port}`)
})