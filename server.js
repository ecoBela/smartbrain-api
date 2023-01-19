const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "123",
      name: "Winnie",
      email: "Winnie@theBear.com",
      password: "honey",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "125",
      name: "Eyeore",
      email: "Eyeore@theShack.com",
      password: "pessimism",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send("This is working");
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

/* 
/ -> GET -> res = this is working
/signin -> POST success /fail
/register -> POST -> user object
/profile/:userID -> GET -> user
/image -> PUT -> user/count
*/

app.listen(3001, () => {
  console.log("App running on port 3001");
});
