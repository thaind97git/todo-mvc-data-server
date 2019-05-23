const express = require("express")
const todoController = require("./todo.controller");
const router = express.Router()

router.get("/todo/todos" , todoController.getAllTodo)
router.post("/todo/create", todoController.addTodo)
router.put("/todo/uO/:_id", todoController.updateCompleteOneTodo)
router.put("/todo/uM", todoController.updateCompleteMultiTodo)
router.delete("/todo/dO/:_id", todoController.deleteOneTodo)
router.delete("/todo/clearC", todoController.clearComplete)

module.exports = router;