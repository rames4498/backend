const express = require("express")

const dotEnv = require('dotenv')
const {MongoClient} = require("mongodb")
const app = express()
dotEnv.config()
MongoClient.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Mongodb connected successfully..")
    })
    .catch((error) => {
        console.log("Error is",error)
    })
const PORT = 3000
console.log(process.env)


 app.use((req, res, next) => {
  const currentTime = new Date().toLocaleString(); // e.g., 7/18/2025, 10:33:12 AM
  console.log('Time: ', currentTime);
  next();
});
 app.get('/', (req, res) => {
  res.send('Successful response.');
 });
 
 app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})
