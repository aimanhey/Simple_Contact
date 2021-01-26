const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require ('dotenv').config();
const app= express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
const port = process.env.PORT || 5010;
const ip ='0.0.0.0';



const uri = "mongodb://localhost:27017/lala";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const user = require('./controllers/user');

app.use('/users', user);

app.listen(port, ip) ;
console.log(`Server is running on port: ${port}`);




