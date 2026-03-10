function DeleteButton({ id, onDelete }) {
const baseApi_url = "http://localhost:8080"
  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseApi_url}/deleteTodo/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onDelete(id)
      }
    } catch (error) {
      console.log("Fel vid borttagning av todo")
    }
  }
  return <button onClick={handleDelete}>Ta bort</button>
}

export default DeleteButton
