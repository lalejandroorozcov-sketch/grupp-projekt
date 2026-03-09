import './App.css'
import TodoFrom from './Components/TodoForm'
import Title from './Components/Title'

function App() {

  return (
    <>
      <Title></Title>

      <TodoForm onAddTodo={handleAddTodo} ></TodoForm>
      <TodoList todos={todos} />
    </>
  )
}

export default App
