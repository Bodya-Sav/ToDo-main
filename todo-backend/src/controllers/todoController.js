const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { UserId: req.user.userId } });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ error: "Название задачи не может быть пустым" });
    }

    const todo = await Todo.create({
      title,
      completed: false,
      UserId: req.user.userId,
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error("Ошибка создания задачи:", error);
    res.status(500).json({ error: "Ошибка сервера при создании задачи" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const todo = await Todo.findOne({ where: { id, UserId: req.user.userId } });

    if (!todo) {
      return res.status(404).json({
        error: "Задача не найдена или у вас нет прав на её изменение",
      });
    }

    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error("Ошибка обновления задачи:", error);
    res.status(500).json({ error: "Ошибка сервера при обновлении задачи" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id, UserId: req.user.userId } });

    if (!todo) {
      return res
        .status(404)
        .json({ error: "Задача не найдена или у вас нет прав на её удаление" });
    }

    await todo.destroy();
    res.json({ message: "Задача удалена", id });
  } catch (error) {
    console.error("Ошибка удаления задачи:", error);
    res.status(500).json({ error: "Ошибка сервера при удалении задачи" });
  }
};
