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

app.get('/getTodo', async (req, res) => {

    try {

        const todocollection = db.collection('Todos')
        // Sortera efter skapelsedatum (äldsta först)
        const snapshot = await todocollection.orderBy('createdAt', 'asc').get()

        if (snapshot.empty) {
            return res.status(200).json([])
        }

        const todos = []

        snapshot.forEach((todo) => {
            todos.push({
                id: todo.id,
                ...todo.data(),
            })
        })

        res.status(200).json(todos)

    } catch (error) {

        res.status(500).send('Somthing wrong with the server.')
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

        const docRef = await db.collection('Todos').add(newTodo)

        // Läs tillbaka det sparade objektet för att få rätt data
        const savedDoc = await docRef.get()
        const savedTodo = {
            id: savedDoc.id,
            ...savedDoc.data()
        }

        res.status(200).json(savedTodo)

    } catch (error) {

        res.status(500).send('Could not add todo, try again later.')

    }

})

app.put('/updateTodo/:id', async (req, res) => {

    try {

        const todoID = req.params.id
        const updates = req.body

        const todoRef = db.collection('Todos').doc(todoID)
        await todoRef.set(updates, { merge: true })

    } catch (error) {

        res.status(500).send('Could update, try again later!')

    }
})

app.put('/changeTodo/:id', async (req, res)=> {
    try {
        const todoID = req.params.id
        const newTitle = req.body.title

        if (!newTitle || newTitle.trim()=== "") {
            return res.status(400).send('No new todo title provided.')
        }

        const todoRef = db.collection('Todos').doc(todoID)
        await todoRef.set({title: newTitle}, {merge: true})

        const changedDoc = await todoRef.get()
        const changedTodo = {
            id: changedDoc.id,
            ...changedDoc.data()
        }

        res.status(200).json(changedTodo)

    } catch (error) {
       res.status(500).send('Could not change todo title.')
    }
})

app.delete('/deleteTodo/:id', async (req, res) => {

    try {

        const todoID = req.params.id

        await db.collection('Todos').doc(todoID).delete()

        res.status(200).send('Delete suecces.')

    } catch (error) {

        res.status(500).send('Could not delete todo.')

    }

})

app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`)
})