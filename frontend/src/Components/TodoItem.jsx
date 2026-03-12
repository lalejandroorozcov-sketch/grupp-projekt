import Checkbox from "./Checkbox"
import DeleteButton from "./Deletebutton"

function TodoItem({ todo, onDelete, onUpdate, onChangeTodo }) {
  return (
    <li>
      <Checkbox todo={todo} onUpdate={onUpdate} />
      <span
        onDoubleClick={() => {
          const newTitle = prompt("Uppdatera din todo", todo.title);
          if (newTitle && newTitle.trim() !== ""){
            onChangeTodo(todo.id, newTitle)
          }
        }}
      >
        {todo.title}
      </span>

      <DeleteButton id={todo.id} onDelete={onDelete} />
    </li>
  )
}

export default TodoItem
