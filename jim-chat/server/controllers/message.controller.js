const router = require("express").Router()
const Message = require("../models/message.model")
const validateSession = require("../middleware/validate-session")

// Endpoint: "http://localhost:4000/message/create"
router.post("/create/:roomid", validateSession, async (req, res) => {
    try {
        const message = new Message({
            owner_id: req.user._id,
            room_id: req.params.roomid,
            msg: req.body.msg
        })

        const newMessage = await message.save()

        res.json({ message: "message created", message: newMessage })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: "http://localhost:4000/message/view-all"
router.get("/view-all", validateSession, async (req, res) => {
    try {
        const allMessages = await Message.find().populate("msg")

        res.json({ message: "view all messages success", allMessages: allMessages })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: "http://localhost:4000/message/:id"
router.get("/:id", validateSession, async (req, res) => {
    try {
        const msg = await Message.findById({ _id: req.params.id })

        res.status(200).json({ msg: msg, message: "Get msg by ID success", })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: "http://localhost:4000/message/:roomid"
router.get("/room/:id", validateSession, async (req, res) => {
    try {
        const room_messages = await Message.find({ room_id: req.params.id })

        res.status(200).json({ room_messages: room_messages, message: "Get messages by room ID success", })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: "http://localhost:4000/message/update/:id"
router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const msg_id = req.params.id
        const conditions = { _id: msg_id, owner_id: req.user._id }
        const data = req.body
        const options = { new: true }
        const message = await Message.findOneAndUpdate(conditions, data, options)

        if (!message) {
            throw new Error("Message can not be altered by this user")
        }

        res.status(200).json({ message: "patch successful", message: message })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: "http://localhost:4000/message/delete/:id"
router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const msg_id = await Message.findById(req.params.id)

        if (!msg_id) {
            throw new Error("Message does not exist")
        }

        if (req.user._id == msg_id.owner_id) {
            throw new Error("The ID for this message does not match the owner ID. Message not deleted.")
        }

        const delete_msg = await Message.deleteOne({ _id: req.params.id, owner_id: req.user._id})

        res.status(200).json({
            delete_msg: delete_msg,
            message: delete_msg.deletedCount > 0
            ? "message was deleted"
            : "message was not deleted"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router