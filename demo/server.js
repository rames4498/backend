const http = require('http');
// Define the server
const server = http.createServer((req, res) => {
  // Set response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Define response content
  res.end('Hello This is my first Node.js college server.\n');
});

// Make the server listen on port 3000
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
