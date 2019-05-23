var mongoose = require("mongoose");

var todoModel = new mongoose.Schema({
    title: { type: String, required: true },
    isComplete: { type: Boolean, default: false }
})

var TodoModel = mongoose.model("todos", todoModel);
module.exports = TodoModel