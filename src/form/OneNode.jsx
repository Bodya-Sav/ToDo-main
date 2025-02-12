import { useState } from "react";
import "../index.css";

export default function OneNode({
  title,
  completed,
  deleteTodo,
  toggleTodoDone,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    toggleEditMode();
  };

  return (
    <div className="onenode">
      {isEditing ? (
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
        />
      ) : (
        <span className={completed ? "strikethrough" : ""}>{currentTitle}</span>
      )}
      <input type="checkbox" checked={completed} onChange={toggleTodoDone} />
      <button className="but" onClick={isEditing ? handleSave : toggleEditMode}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button className="but" onClick={deleteTodo}>
        Delete
      </button>
    </div>
  );
}
