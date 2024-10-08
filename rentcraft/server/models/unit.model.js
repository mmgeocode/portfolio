const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },

    tenant_id: {
        type: String,
        ref: "Tenants",
    },

    address: {
        type: String,
        required: true,
    },

    city: {
        type: String,
    },

    state: {
        type: String,
    },

    zip: {
        type: String,
    },

    monthlyRent: {
        type: String,
    },

    unitState: {
        type: String,
    },

    active: {
        type: Boolean,
        defaultValue: true,
    },
})

module.exports = mongoose.model("Unit", UnitSchema)