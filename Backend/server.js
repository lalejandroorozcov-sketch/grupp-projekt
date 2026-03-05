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

app.post('/addTodo', async (req, res) => {

    try {

        const { title, completed } = req.body

        if (!title || title.trim() == '') {

            return res.status(400).send('Title saknas')

        }

        const newTodo = {
            title,
            completed: completed || false,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        }

        const docRef = await db.collection('Todos').add(newTodo)

        res.status(201).json({
            id: docRef.id,
            ...newTodo,
        })

    } catch (error) {

        res.status(500).send('Något gick fel.')

    }

})

app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`)
})