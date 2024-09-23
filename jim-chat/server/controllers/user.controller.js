const router = require("express").Router()
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validateSession = require("../middleware/validate-session")

// Endpoint: localhost:4000/user/create
router.post("/create", async (req, res) => {
    try {
        const { userName, email, password } = req.body

        const user = new User({
            userName: userName,
            email: email,
            password: bcrypt.hashSync(password, 10),
        })

        const newUser = await user.save()

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_JIM, { expiresIn: 30 * 24 * 60 * 60,})

        res.json({ message: "created successfully", user: newUser, token: token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router