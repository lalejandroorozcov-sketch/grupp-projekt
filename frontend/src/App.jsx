import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './Components/TodoForm'
import Title from './Components/Title'
import TodoList from './Components/TodoList'
import { getTodos, addTodo as apiAddTodo, deleteTodo as apiDeleteTodo, updateTodo as apiUpdateTodo } from './Api/TodoApi'

function App() {
  const [todos, setTodos] = useState([]);

  // Ladda todos från backend när appen startar
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromBackend = await getTodos();
        setTodos(todosFromBackend);
      } catch (error) {
        console.log('Kunde inte ladda todos från backend');
      }
    };
    loadTodos();
  }, []);

  const handleAddTodo = async (newTodo) => {
    try {
      // Spara till backend först
      const savedTodo = await apiAddTodo({ title: newTodo });
      // Sedan uppdatera frontend
      setTodos(prevTodos => [...prevTodos, savedTodo]);
    } catch (error) {
      console.log('Kunde inte spara todo till backend');
    }
  };

  const handleUpdateTodo = async (id, updates) =>{
    try {
      await apiUpdateTodo(id, updates);
      setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, ...updates } : todo));
    } catch (error) {
      
    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      // Ta bort från backend först
      await apiDeleteTodo(id);
      // Sedan uppdatera frontend
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.log('Kunde inte ta bort todo från backend');
    }
  };

  return (
    <>
      <Title />
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} />
    </>
  )
}

export default App
