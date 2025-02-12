import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Top from "./form/Top";
import Middle from "./form/Middle";
import Bottom from "./form/Bottom";

import "./index.css";

import {
  getTodosApi,
  setAuthToken,
  updateTodoApi,
  addTodoApi,
  deleteTodoApi,
  logoutUser,
} from "./api/api";

export default function ToDo() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [node, setNode] = useState("");
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [showCheckedOnly, setShowCheckedOnly] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      loadTodos();
    }
  }, []);

  const loadTodos = async () => {
    try {
      const todosFromServer = await getTodosApi();
      setTodos(todosFromServer);
    } catch (error) {
      console.error("Ошибка загрузки задач:", error);
    }
  };

  const addTodo = async () => {
    if (node.trim() !== "") {
      try {
        const newTodo = await addTodoApi(node);
        setTodos((prev) => [...prev, newTodo]);
        setNode("");
      } catch (error) {
        console.error("Ошибка добавления задачи:", error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoApi(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
    }
  };

  const toggleTodoDone = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      const updatedTodo = await updateTodoApi(id, !todo.completed);
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
    }
  };

  const countDone = todos.filter((todo) => todo.completed).length;
  const countExist = todos.length - countDone;

  const toggleCheckAll = async () => {
    const allChecked = todos.every((todo) => todo.completed);
    try {
      const updatedTodos = await Promise.all(
        todos.map(async (todo) => {
          if (todo.completed === allChecked) {
            return await updateTodoApi(todo.id, !allChecked);
          }
          return todo;
        })
      );
      setTodos(updatedTodos);
      setIsAllChecked(!allChecked);
    } catch (error) {
      console.error("Ошибка при переключении всех задач:", error);
    }
  };

  const toggleShowChecked = () => {
    setShowCheckedOnly((prev) => !prev);
  };

  const handleLogout = () => {
    logoutUser();
    setTodos([]);
    navigate("/login");
  };

  return (
    <div className="todo">
      <Top
        node={node}
        setNode={setNode}
        addTodo={addTodo}
        isAllChecked={isAllChecked}
        toggleCheckAll={toggleCheckAll}
        toggleShowChecked={toggleShowChecked}
        showCheckedOnly={showCheckedOnly}
      />
      <Middle
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodoDone={toggleTodoDone}
        showCheckedOnly={showCheckedOnly}
      />
      <Bottom countDone={countDone} countExist={countExist} />
      <button className="exit" onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
}
