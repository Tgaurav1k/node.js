const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose")
const app = express();
const PORT = 8000;

// ⭐ IMPORTANT: Enable JSON body parsing
// app.use(express.json());

// Connection  
mongoose.connect("mongodb://localhost:27017/youtube-App-Gaurav")
.then(()=>console.log("MongoDb Connected"))
.catch(err=>console.log("Error Occur"))

// Schema
const userSchema = new mongoose.Schema({
  firstNmae:{
    type: String,
    required: true,
  },
  lastName:{
    type:String,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
    jobTitle:{
      type:String,
    },
    gender:{
      type: String,
      required: true,
    }
})

const User = mongoose.model("user", userSchema);


// Middleware plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  console.log("Gaurav here");
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n `,
    (err, data) => {
      next();
    }
  );
});
//  this is for my users where we can see middleware direct retun us message without passes it to the next middleware

// app.use((req, res , next)=>{
//     console.log("Hello from middleware 1");
//     return res.json({mgs:"hello from middleware 2"});
// })

app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  // req.myUserName = "Gaurav.thakur1k"
  req.creditcardNo = "2323";
  next();
});

app.use((req, res, next) => {
  // console.log("hello from middle ware 2", req.myUserName);
  console.log("here is the credit card number ", req.creditcardNo);
  next();
});

app.use((req, res, next) => {
  console.log("this side gaurav");
  // return res.end("Gaurav here");
  next();
});

// resonse time =>

// REST API Routes
app.get("/api/users", (req, res) => {
  res.setHeader("X-myName", "Gaurav Kumar");
  console.log(req.headers);
  // console.log("I am in get route ", req.myUserName);
  return res.json(users);
});

// REST API     // get request
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user)  return res.status(404).json({error:"user not exist"})                                    
    return res.json(user);            
  })                             
  .patch((req, res) => {         
    // Edit user with id          
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    // delete user with id
    const body = req.body;
    users.pull({ ...body, id: users.length - 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", id: users.length });
    });
  });
// app.get("/api/users/:id", (req, res)=> {
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     return res.json(user);
// });

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// POST new user

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email ||
    !body.job_title
  ) {
    return res
      .status(400)
      .json({ msg: "failed something is missing, all fields are required " });
  }
    
 const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender:body.gender,
    jobTtle: body.job_title
  })

  });
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });
  //  console.log('Body', body);


app.listen(PORT, () => {
  const name = "gaurav";
  console.log(`Server stated at ${PORT}
        hey ${name} its your server`);
});

// setInterval(() => {
//   console.log("Server still alive...");
// }, 5000);
