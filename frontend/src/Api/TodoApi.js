const baseApi_url = "http://localhost:8080"

export const getTodos = async () => {

    const response = await fetch(`${baseApi_url}/getTodo`)
    return response.json()
}

export const addTodo = async (todo) => {

    const response = await fetch(`${baseApi_url}/addTodo`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(todo),
    })

    return response.json()
}

export const updateTodo = async (id, updates) => {

    await fetch(`${baseApi_url}/updateTodo/${id}`, {
        method: "PUT",
        headers: { "Content-Typ": "application/json", },
        body: JSON.stringify(updates),
    })

}

export const deleteTodo = async (id) => {

    await fetch(`${baseApi_url}/deletedTodo/${id}`, {
        method: "DELETE",
    })
}