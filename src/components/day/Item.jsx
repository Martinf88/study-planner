import { useState } from "react";
import { useStore } from "../../data/store";

const Item = ({ item }) => {
  const [isChecked, setIsChecked] = useState(item.done);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.text);
  const { toggleTodo, setTodos, todos } = useStore((state) => ({
    toggleTodo: state.toggleTodo,
    setTodos: state.setTodos,
    todos: state.todos,
  }));

  const handleChange = () => {
    setIsChecked(!isChecked);
    toggleTodo(item.id);
  };

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    setIsEditing(false);
  };

  const handleRemoveItem = (id) => {
    console.log("Removing item with id:", id);

    const updatedTodos = todos.filter((todoItem) => todoItem.id !== item.id);

    console.log("Updated todos:", updatedTodos);
    setTodos(updatedTodos);
  };

  let itemClass = "";
  if (item.done) itemClass += "done";
  if (item.late) itemClass += "due";

  return (
    <div className="item">
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      {isEditing ? (
        <>
          <input type="text" value={editedText} onChange={handleTextChange} />
          <span title="Spara" onClick={handleEditSubmit}>
            👍
          </span>
        </>
      ) : (
        <>
          <label className={itemClass} onClick={handleChange}>
            {editedText}
          </label>
          <span title="Ändra" onClick={handleEditClick}>
            ✍️
          </span>
          <span title="Ta bort" onClick={() => handleRemoveItem(item.id)}>
            🗑️
          </span>
        </>
      )}
      {/* <span title="Snooza">💤</span> */}
    </div>
  );
};

export default Item;
