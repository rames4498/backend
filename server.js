const express = require('express');
 const app = express();
 app.use((req, res, next) => {
  const currentTime = new Date().toLocaleString(); // e.g., 7/18/2025, 10:33:12 AM
  console.log('Time: ', currentTime);
  next();
});
 app.get('/', (req, res) => {
  res.send('Successful response.');
 });
 
 app.listen(3000, () => console.log('Example app is listening on port 3000.'))