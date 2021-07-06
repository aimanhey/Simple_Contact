const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const user = require("./controllers/user");
const contact = require("./controllers/contact");
const fileUpload = require('express-fileupload');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(fileUpload());
const port = process.env.PORT || 5010;
const ip = "0.0.0.0";

const uri = process.env.DATABASE
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/user", user);
app.use("/api/contact", contact);
app.use("/hanya",()=>console.log('makan'));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.listen(port, ip);
console.log(`Server is running on port: ${port}`);
