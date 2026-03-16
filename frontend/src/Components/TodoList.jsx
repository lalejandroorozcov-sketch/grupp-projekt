import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onUpdate, onChangeTodo }) {

    return (
        <>
            <ul className="todoList">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} onChangeTodo={onChangeTodo} />
                ))}
            </ul>
        </>
    )

}

export default TodoList;