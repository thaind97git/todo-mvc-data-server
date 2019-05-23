const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const ApiTodoRouter = require("./app/todo/todo.router");

mongoose.connect("mongodb://localhost/todo")


const app = express();
app.use(cors());
const port = '3001';
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', ApiTodoRouter);

app.listen(port, () => console.log("Server running at port " + port))