const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const user = require('./user');

const port = 7777;

const app = express();
app.use(express.static(path.join(__dirname, 'html')));

app.listen(port, function () {
  console.log("Started listening on port", port);
});

app.use(bodyParser.json());

app.post('/signin', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log(`Sign in with email: ${email} and password: ${password}`);
  user.signin(email, password, (successLogin) => {
        if (successLogin) {
          res.send('success');
        } else {
          res.status(500);
          res.send('Wrong email of password');
        }
      }
  );
});

app.post('/signup', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  if (name && email && password) {
    console.log(`Sign up with name: ${name} email: ${email} and password: ${password}`);
    user.signup(name, email, password);
    res.send('success');
  } else {
    res.status(500);
    res.send('failure');
  }
});