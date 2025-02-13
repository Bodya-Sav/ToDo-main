import { useEffect, useState } from "react";
import "../index.css";

export default function OneNode({
  id,
  title,
  completed,
  deleteTodo,
  toggleTodoDone,
  updateTitle,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateTitle(id, currentTitle);
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
