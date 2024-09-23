const mongoose = require("mongoose")
const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    description: {
        type: String,
    },

    addedUsers: {
        type: mongoose.Types.ObjectId,
        ref:"User",
    },

    owner_id: {
        type: mongoose.Types.ObjectId,
        ref:"User",
    }
})

module.exports = mongoose.model("Room", RoomSchema)