function List() {
  return (
    <>
      <ul className="todoList">
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </>
  )
}

export default List
