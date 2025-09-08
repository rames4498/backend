const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts'); // Import layout middleware

const app = express();
const PORT = 3000;

// Setup morgan for logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

// Set view engine and views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Define default layout

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', name: 'John Doe' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
