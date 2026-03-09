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

  return (
    <>
      <Title />
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} />
    </>
  )
}

export default App
