const baseApi_url = "http://localhost:8080"

export const getTodos = async () => {

    const response = await fetch(`${baseApi_url}/getTodo`)
    return response.json()
}

export const addTodo = async (todo) => {

    const response = await fetch(`${baseApi_url}/addTodos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(todo),
    })

    if (!response.ok) {
        throw new Error("Failed to add todo")
    }

    return response.json()
}

export const updateTodo = async (id, updates) => {

    await fetch(`${baseApi_url}/updateTodo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(updates),
    })

}

export const deleteTodo = async (id) => {
    const response = await fetch(`${baseApi_url}/deleteTodo/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

export const changeTodo = async (id, newTitle) => {

    const response = await fetch(`${baseApi_url}/changeTodo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ title: newTitle })
    })
    return response.json()
}