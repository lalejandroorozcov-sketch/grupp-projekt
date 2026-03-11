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
        // Extra säkerhet: sortera även i frontend
        const sortedTodos = todosFromBackend.sort((a, b) => {
          return new Date(a.createdAt?.seconds * 1000 || 0) - new Date(b.createdAt?.seconds * 1000 || 0);
        });
        setTodos(sortedTodos);
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

  const handleUpdateTodo = async (id, updates) => {
    // ⚡ OPTIMISTIC UPDATE: Uppdatera UI direkt
    setTodos(prevTodos => prevTodos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));

    try {
      // ⏳ Uppdatera backend i bakgrunden
      await apiUpdateTodo(id, updates);
      // ✅ Om backend lyckas, behöver vi inte göra något mer
    } catch (error) {
      console.log("FEL vid update:", error);
      // 🔙 TODO: Återställ ändringen om backend misslyckas
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
