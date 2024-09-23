require("dotenv").config()
const express = require('express')
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")

// Controllers
const userController = require("../server/controllers/user.controller")

// ENV
const PORT = process.env.PORT
const DBName = process.env.DB_Name
const DB_URL = process.env.DB_URL

// DB Connect
mongoose.connect(DB_URL+DBName)
const db = mongoose.connection

db.once("open", () => { console.log("connected to the DB", DBName)})

app.use(cors())
app.use(express.json())
app.use("/user", userController)

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})