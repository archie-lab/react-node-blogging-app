const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

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
  res.send('success');
});
