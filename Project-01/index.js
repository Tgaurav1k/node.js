const express = require("express");
const users = require("./MOCK_DATA.json") 
const app = express();
const PORT = 8080;

// Routes
app.get("/api/users", (req, res)=>{
    return res.json(users)
})

// REST API     // get request 
app.get("/api/users/:id", (req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id );
    return res.json(user);
})
.patch((req,res)=>{
    // Edit usr with id 
    return res.json({ status: "Pending"});
})
.delete((req, res)=>{
    // delete user with id 
    return res.json({status: "Pending"})
});
// app.get("/api/users/:id", (req, res)=> {
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     return res.json(user);
// });

app.get("/users" , (req,res)=>{
    const html = `
    <ul>
    ${users.map((user)=>
    `<li>${user.first_name}</li>`
    ).join("")}
    </ul>
    `;
    res.send(html);
})

// POST new user 

app.post("/api/users", (req,res)=>{

} )


app.listen(PORT, ()=>{
    console.log(`Server stated at ${PORT}`)
})