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
    console.log(`Servern körs på https://localhost:${PORT}`)
})