const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const user = require('./user');
const post = require('./post');

const port = 7777;
let sessions;

const app = express();
app.use(express.static(path.join(__dirname, 'html')));
app.use(session({secret: 'my-secret'}));

app.listen(port, function () {
  console.log("Started listening on port", port);
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

app.get('/home', (req, res) => {
  if (sessions && sessions.username) {
    res.sendFile(__dirname + '/html/home.html');
  } else {
    res.status(401);
    res.send('unauthorized');
  }
});

app.post('/signin', (req, res) => {
  sessions = req.session;
  let email = req.body.email;
  let password = req.body.password;
  console.log(`Sign in with email: ${email} and password: ${password}`);
  user.signin(email, password, (successLogin) => {
        if (successLogin) {
          sessions.username = email;
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

app.post('/posts', (req, res) => {
  let title = req.body.title;
  let subject = req.body.subject;
  post.addPost(title, subject, (result) => res.send(result));
});

app.get('/posts', (req, res) => {
  post.getPosts((result) => res.send(result));
});

app.get('/posts/:id', (req, res) => {
  post.getPost(req.params.id, (result) => res.send(result));
});

app.put('/posts/:id', (req, res) => {
  let title = req.body.title;
  let subject = req.body.subject;
  post.updatePost(req.params.id, title, subject, result => res.send(result));
});

app.delete('/posts/:id', (req, res) => {
  post.deletePost(req.params.id, result => res.send(result));
});
