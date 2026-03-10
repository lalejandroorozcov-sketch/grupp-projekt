import { useState } from 'react'
import './App.css'
import TodoForm from './Components/TodoForm'
import Title from './Components/Title'
import TodoList from './Components/TodoList'

function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, {
      id: Date.now(),
      text: newTodo,
      completed: false
    }]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <Title />
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} />
    </>
  )
}

export default App
