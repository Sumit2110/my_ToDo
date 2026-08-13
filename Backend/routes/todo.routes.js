const express = require("express");
const protect = require("../middleware/auth.middleware");

const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require("../controllers/todo.controllers");


const router = express.Router();


router.post("/", protect, createTodo);


router.get("/", protect, getTodos);


router.put("/:id", protect, updateTodo);

router.delete("/:id", protect, deleteTodo);

module.exports = router;
