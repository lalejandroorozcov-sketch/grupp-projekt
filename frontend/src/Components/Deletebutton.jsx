function DeleteButton(props) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`${api_url}/deleteTodo/${props.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        props.onDelete(props.id)
      }
    } catch (error) {
      console.log("Fel vid borttagning av todo")
    }
  }
  return <button onClick={handleDelete}>Ta bort</button>
}

export default DeleteButton
