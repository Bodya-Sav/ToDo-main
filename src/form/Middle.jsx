import OneNode from "./OneNode";
import "../index.css";

export default function Middle({
  todos,
  deleteTodo,
  toggleTodoDone,
  showCheckedOnly,
  updateTitle,
}) {
  return (
    <div className="middle">
      <div className="first">
        {todos
          .filter((todo) => !showCheckedOnly || todo.completed)
          .map((todo) => (
            <OneNode
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              deleteTodo={() => deleteTodo(todo.id)}
              toggleTodoDone={() => toggleTodoDone(todo.id)}
              updateTitle={updateTitle}
            />
          ))}
      </div>
    </div>
  );
}
