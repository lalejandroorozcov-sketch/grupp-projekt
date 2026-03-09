import Checkbox from "./Checkbox"
import DeleteButton from "./Deletebutton"

function TodoItem({ todo, onDelete }) {
  return (
    <li>
      <Checkbox todo={todo} />
      <span
        onClick={() => (todo.id, todo.completed)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>

      <DeleteButton />
    </li>
  )
}

export default TodoItem
