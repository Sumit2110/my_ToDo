const express = require("express");
const protect = require("../middleware/auth.middleware");

const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require("../controllers/todo.controllers");


const router = express.Router();

// Create Todo
router.post("/", protect, createTodo);

// Get user's Todos
router.get("/", protect, getTodos);

// Update Todo
router.put("/:id", protect, updateTodo);

router.delete("/:id", protect, deleteTodo);

module.exports = router;