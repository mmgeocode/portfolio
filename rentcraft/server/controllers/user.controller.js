const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');

// Endpoint: http://localhost:4000/user/create
router.post('/create', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcrypt.hashSync(password, 10)
        })

        const newUser = await user.save()

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: 30 * 24 * 60 * 60})

        res.json({ message: 'user created successfully', user: newUser, token: token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/user/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user) {
            throw new Error('User or password is incorrect')
        }

        const isPasswordAMatch = bcrypt.compare(password, user.password)

        if (!isPasswordAMatch) {
            throw new Error('User or password is incorrect')
        }

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 30 * 24 * 60 * 60 })

        res.json({ message: `Welcome ${user.firstName}`, user: user, token: token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/user/:id
router.get('/:id', validateSession, async (req, res) => {
    
    
    try {
        const user = await User.findById({ _id: req.params.id })
        
        if (!user) {
            throw new Error('User not found')
        }

        res.status(200).json({ user: user, message: "user found"})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/user/update/:id
router.patch('/update/:id', validateSession, async (req, res) => {
    try {
        const conditions = { _id: req.user._id }
        const data = req.body
        const options = { new: true }
        const user = await User.findOneAndUpdate(conditions, data, options)

        if (!user) {
            throw new Error('Failed to update')
        }

        res.json({ message: 'user patch successful', user: user })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/user/delete/:id
router.delete('/delete/:id', validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.deleteOne({ _id: id })

        res.json({ message: user.deletedCount === 1 ? 'User deleted' : 'Error: user not deleted' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;