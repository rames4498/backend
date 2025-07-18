const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// 1️ Morgan logger
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

// 2️ Form POST body parser
app.use(express.urlencoded({ extended: true }));

// 3️ Static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// 4️ Routes for GET
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

// 5️ Contact POST — responds with HTML file
app.post('/contact', (req, res) => {
  const { names, message } = req.body;
  console.log(`${names} says: ${message}`);
  //res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
   
  res.send(`
    <h2> Thank you , ${names}! for being a good developer</h2>
    <p>Your message: "${message}" has been received.</p>
    <a href="/">Go back to Home</a>
  `);

});

// POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Login Attempt: ${username}`);
  
  if (username === "admin" && password === "1234") {
    res.send(`<h2>Welcome, ! you have successfuly logged as  ${username}</h2><a href="/">Go Home</a>`);
  } else {
    res.send(`<h2> Invalid credentials</h2><a href="/login">Try Again</a>`);
  }
});

// 6️ Fallback 404 page
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 Not Found</h1>
    <a href="/">Return Home</a>
  `);
});

// 7️ Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
