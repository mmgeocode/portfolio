const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema({

    owner_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    room_id: {
        type: mongoose.Types.ObjectId,
        ref: "Room",
        required: true,
    },

    msg: {
        type: String,
        required: true,
    },

}, {timestamps: true})

module.exports = mongoose.model("Message", MessageSchema)