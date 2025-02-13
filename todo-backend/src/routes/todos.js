const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoTitle,
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.post("/:id", updateTodoTitle);

module.exports = router;
