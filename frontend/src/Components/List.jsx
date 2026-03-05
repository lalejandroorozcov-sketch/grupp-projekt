function List({ todos }) {
  return (
    <>
      <ul className="todoList">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}

export default List
