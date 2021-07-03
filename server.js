const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const user = require("./controllers/user");
const contact = require("./controllers/contact");

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
const port = process.env.PORT || 5010;
const ip = "0.0.0.0";

const uri = process.env.DATABASE
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/user", user);
//app.use("/api/contact", contact);

app.listen(port, ip);
console.log(`Server is running on port: ${port}`);
