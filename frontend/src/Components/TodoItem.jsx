import Checkbox from "./Checkbox"

function TodoItem({ todo, onDelete }) {
  return (
    <li>
      <span
        onClick={() => (todo.id, todo.completed)}
        sytle={{
          textDecoration: todo.complited ? "line-through" : "none",
        }}
      >
        <Checkbox></Checkbox>

        {todo.title}
      </span>

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  )
}

export default TodoItem
