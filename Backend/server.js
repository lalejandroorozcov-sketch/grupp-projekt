const express = require("express")
const cors = require("cors")
const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 8080

app.get('/getTodos', async (req, res) => {

    try {

        const todoCollection = db.collection('Todos')
        const snapshot = await todoCollection.get()

        if (snapshot.empty) {

            return res.status(200).json([])
        }

        const todos = []

        snapshot.forEach((todo) => {
            todos.push({
                id: todo.id,
                ...todo.data()
            })
        })

        res.status(200).json(todos)

    } catch (error) {

        res.status(500).send('Somthing is wrong in the server, try again later.')

    }

})

app.post('/addTodos', async (req, res) => {

    try {

        const { title, completed } = req.body

        if (!title || title.trim() == "") {

            return res.status(400).send('Title are missing, try again.')
        }

        const newTodo = {
            title,
            completed: completed || false,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        }

        const docRef = db.collection('Todos').add(newTodo)

        res.status(200).json({
            id: docRef.id,
            ...newTodo,
        })

    } catch (error) {

        res.status(500).send('Could not add todo, try again later.')

    }

})

app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`)
})