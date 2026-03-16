import { useState } from "react";
import Checkbox from "./Checkbox"
import DeleteButton from "./Deletebutton"

function TodoItem({ todo, onDelete, onUpdate, onChangeTodo }) {
const [isEditing, setIsEditing] = useState(false)
const [editValue, setEditValue] = useState(todo.title)

const handleSubmit = (e) => {
  e.preventDefault();
  if (editValue.trim() !== "") {
    onChangeTodo(todo.id, editValue.trim());
    setIsEditing(false);
  }
}


  return (
    <li>
      <Checkbox todo={todo} onUpdate={onUpdate} />
      {isEditing ? (
        <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        />
        </form>
      ) : (
      <span
        onDoubleClick={() => setIsEditing(true)}
        style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}>
        {todo.title}
      </span>
)}
      <DeleteButton id={todo.id} onDelete={onDelete} />
    </li>
  )
}

export default TodoItem
