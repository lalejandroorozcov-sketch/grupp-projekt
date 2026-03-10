import Checkbox from "./Checkbox"
import DeleteButton from "./Deletebutton"

function TodoItem({ todo, onDelete, onUpdate }) {
  return (
    <li>
      <Checkbox todo={todo} onUpdate={onUpdate} />
      <span
        onClick={() => (todo.id, todo.completed)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.title}
      </span>

      <DeleteButton id={todo.id} onDelete={onDelete} />
    </li>
  )
}

export default TodoItem
