const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

const app = express();
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "123",
      name: "Winnie",
      email: "Winnie@theBear.com",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Eyeore",
      email: "Eyeore@theShack.com",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "222",
      email: "Winnie@theBear.com",
      hash: "",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  bcrypt.compare(
    "snacks",
    "$2a$10$cq1avQ6ABoMCjSP5Baa88eHZyLYDDX0o/Lev0LPjnRjVgF6/yBUQy",
    function (err, res) {
      console.log("first guess", res);
      // res == true;
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$cq1avQ6ABoMCjSP5Baa88eHZyLYDDX0o/Lev0LPjnRjVgF6/yBUQy",
    function (err, res) {
      console.log("second guess", res);
      // res = false;
    }
  );
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

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.map((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("error, user not recognised");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

bcrypt.hash("bacon", null, null, function (err, hash) {
  // Store hash in your password DB.
});

// Load hash from your password DB.

app.listen(3001, () => {
  console.log("App running on port 3001");
});
