import TodoItem from "./TodoItem";

function TodoList({ todos }){
return(
    <>
      <ul className="todoList">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
)

}

export default TodoList;