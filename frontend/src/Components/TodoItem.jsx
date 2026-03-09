import Checkbox from "./Checkbox"
import DeleteButton from "./Deletebutton"

function TodoItem({ todo, onDelete }) {
  return (
    <li>
      <Checkbox></Checkbox>
      <span
        onClick={() => (todo.id, todo.completed)}
        sytle={{
          textDecoration: todo.complited ? "line-through" : "none",
        }}
      >
        {todo.title}
      </span>

      <DeleteButton />
    </li>
  )
}

export default TodoItem
