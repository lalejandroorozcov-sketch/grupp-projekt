import { useState } from "react";
import Checkbox from "./Checkbox"
import DeleteButton from "./Deletebutton"
import Fireworks from "./Firework";

function TodoItem({ todo, onDelete, onUpdate, onChangeTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)
  const [fireworksTrigger, setFireworksTrigger] = useState(false)

  const formatDate = (timestamp) => {

    if (!timestamp) return "Loading.."

    // Hantera Firebase timestamp.
    const seconds = timestamp.seconds || timestamp._seconds

    if (seconds) {

      const date = new Date(seconds * 1000)

      return date.toLocaleString("sv-SE")

    }

    const date = new Date(timestamp)

    if (isNaN(date.getTime())) return "Unknown"

    return date.toLocaleDateString("sv-SE")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editValue.trim() !== "") {
      onChangeTodo(todo.id, editValue.trim());
      setIsEditing(false);
    }
  }

  const handleCheckboxClick = (todoId, updateData) => {
    onUpdate(todoId, updateData);
    if (updateData.completed === true) {
      setFireworksTrigger(true)
      setTimeout(() => setFireworksTrigger(false), 100)
    }
  }


  return (
    <li>
      <Checkbox todo={todo} onUpdate={handleCheckboxClick} />
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
          title="Dubbelklicka för att redigera din todo"
          style={{
            textDecoration: todo.completed ? "line-through" : "none"

          }}>
          {todo.title}
        </span>
      )}

      <br />

      <small style={{ color: "gray" }}>
        Made: {formatDate(todo.createdAt)}
      </small>
      <Fireworks trigger={fireworksTrigger} />
      <DeleteButton id={todo.id} onDelete={onDelete} />
    </li>
  )
}

export default TodoItem
