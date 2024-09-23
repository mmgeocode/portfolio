const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    userName: { 
        type: String, 
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("User", UserSchema)