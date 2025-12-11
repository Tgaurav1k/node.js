const express = require("express");
const users = require("./MOCK_DATA.json") 
const fs = require('fs')
const app = express();
const PORT = 8080;

// ⭐ IMPORTANT: Enable JSON body parsing
app.use(express.json());

// Middleware plugin 
app.use(express.urlencoded({extended: false}));

// Routes
app.get("/api/users", (req, res)=>{
    return res.json(users)
})

// REST API     // get request 
app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        // Edit user with id
        return res.json({ status: "Pending" });
    })
    .delete((req, res) => {
        // delete user with id
        const body = req.body;
        users.pull({...body, id: users.length - 1})
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) =>{
          return  res.json({status: "success", id: users.length})
        })
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
     const body = req.body;
     users.push({...body, id: users.length +1 });
     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) =>{
          return  res.json({status: "success", id: users.length})
     } )
    //  console.log('Body', body);
   
} )


app.listen(PORT, ()=>{
    console.log(`Server stated at ${PORT}`)
})