const router = require("express").Router();
const Unit = require("../models/unit.model");
const validateSession = require("../middleware/validate-session");

// Endpoint: http://localhost:4000/unit/create
router.post("/create", validateSession, async (req, res) => {
    try {
        const { tenant_id, address, city, state, zip, monthlyRent, unitState } = req.body

        const unit = new Unit({
            user_id: req.user._id,
            tenant_id: tenant_id,
            address: address,
            city: city,
            state: state,
            zip: zip,
            monthlyRent: monthlyRent,
            unitState: unitState,
            active: true,
        })

        const newUnit = await unit.save()

        res.json({ message: "Unit created", unit: newUnit })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/unit/view-all
router.get("/view-all", validateSession, async (req, res) => {
    try {
        const units = await Unit.find()

        
        res.json({
            message: "Viewing all units",
            units: units,
            userId: req.user._id,
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/unit/user/:id
router.get("/user/:id", validateSession, async (req, res) => {
    try {
        const user_units = await Unit.find()

        res.json({ message: "Units found by user success", user_units: user_units })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/unit/:id
router.get("/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const unit = await Unit.findById(id)

        res.json({ message: "Unit Found", unit: unit })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/unit/update/:id
router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const conditions = { _id: id, user_id: req.user._id }

        let {
            user_id,
            tenant_id,
            address,
            city,
            state,
            zip,
            monthlyRent,
            unitState,
            active,
        } = req.body

        const options = { new: true }
        const data = {
            user_id,
            tenant_id,
            address,
            city,
            state,
            zip,
            monthlyRent,
            unitState,
            active,
        }

        const unit = await Unit.findOneAndUpdate(conditions, data, options)

        if (!unit) {
            throw new Error("Unit not found")
        }

        res.json({ message: "Unit updated", unit: unit })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/unit/delete/:id
router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const unit = await Unit.deleteOne({ _id: id })

        res.json({ message: unit.deletedCount === 1 ? "Unit deleted" : "Failed to delete unit" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router