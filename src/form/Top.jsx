import "../index.css";

export default function Top({
  node,
  setNode,
  addTodo,
  isAllChecked,
  toggleCheckAll,
  toggleShowChecked,
  showCheckedOnly,
}) {
  return (
    <div className="top">
      <input
        className="inp"
        type="text"
        onChange={(e) => setNode(e.target.value)}
        value={node}
      ></input>
      <button className="btn" onClick={addTodo}>
        Add
      </button>
      <button onClick={toggleCheckAll}>
        {isAllChecked ? "Uncheck All" : "Check All"}
      </button>
      <button onClick={toggleShowChecked}>
        {" "}
        {showCheckedOnly ? "Show All" : "Show Checked"}{" "}
      </button>
    </div>
  );
}
