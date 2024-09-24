const router = require("express").Router()
const Room = require("../models/room.model")
const validateSession = require("../middleware/validate-session")

// Endpoint: "http://localhost:4000/room/create"
router.post("/create", validateSession, async (req, res) => {
    try {
        const room = new Room({
            name: req.body.name,
            description: req.body.description,
            addedUsers: req.user._id,
            owner_id: req.user._id,
        })

        const newRoom = await room.save()

        res.json({ message: "room created", room: newRoom })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: "http://localhost:4000/room/view-all"
router.get("/view-all", validateSession, async (req, res) => {
    try {
        const rooms = await Room.find().populate("name", "description owner_id")

        res.json({ message: "view all rooms success", rooms: rooms })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: "http://localhost:4000/room/:id"
router.get("/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const conditions = { _id: id, owner_id: req.user._id }
        const data = req.body
        const options = { new: true }
        const room = await Room.findById(conditions, data, options)        

        if (!room) {
            throw new Error("No rooms match that ID")
        }

        res.json({ message: "Room found", room: room, })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: "http://localhost:4000/room/update/:id"
router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const conditions = { _id: id, owner_id: req.user._id }
        const data = req.body
        const options = { new: true }
        const room = await Room.findOneAndUpdate(conditions, data, options)

        if (!room) {
            throw new Error("No room to update")
        }

        res.json({ message: "room updated", room: room, })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: "http://localhost:4000/room/delete/:id"
router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const conditions = { _id: id }
        const room = await Room.deleteOne(conditions)
        console.log(room)

        res.json({ message: room.deletedCount === 1
            ? "room deleted"
            : "failed to delete room"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router