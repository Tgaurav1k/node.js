const express = require("express");
const users = require("./MOCK_DATA.json") 
const fs = require('fs')
const app = express();
const PORT = 8080;

// ⭐ IMPORTANT: Enable JSON body parsing
app.use(express.json());

// Middleware plugin 
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended:false}));

app.use((req, res , next)=>{
    console.log("Gaurav here");
    fs.appendFile(
        "log.txt",
        `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n `,
        (err, data)=>{
            next();
        }

    )

})
//  this is for my users where we can see middleware direct retun us message without passes it to the next middleware  

// app.use((req, res , next)=>{
//     console.log("Hello from middleware 1");
//     return res.json({mgs:"hello from middleware 2"});
// })


app.use((req, res , next)=>{
    console.log("Hello from middleware 1");
    // req.myUserName = "Gaurav.thakur1k"  
    req.creditcardNo = "2323"
    next();
});

app.use((req, res , next) =>{
    // console.log("hello from middle ware 2", req.myUserName);
    console.log("here is the credit card number ", req.creditcardNo);
    next();
});

app.use((req, res, next)=>{
    console.log("this side gaurav");
    // return res.end("Gaurav here");
    next();
})

// resonse time =>

// REST API Routes 
app.get("/api/users", (req, res)=>{
    res.setHeader("X-myName", "Gaurav Kumar");
    console.log(req.headers);
    // console.log("I am in get route ", req.myUserName);
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