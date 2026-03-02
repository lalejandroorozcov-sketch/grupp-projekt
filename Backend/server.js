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

app.listen(PORT, () => {
    console.log(`Servern körs på https://localhost:${PORT}`)
})