import { useState } from "react"

function TodoForm({ onAddTodo }) {

  const [title, setTitle] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!title.trim()) {
      console.log("You have to write somthing.")
      return
    }

    onAddTodo(title)

    setTitle("")

  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>

      <input
        className="todo-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add todo..."
      />

      <button type="submit">
        Add
      </button>

    </form>
  )

}

export default TodoForm
