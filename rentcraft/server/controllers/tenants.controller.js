const router = require("express").Router();
const Tenants = require("../models/tenants.model");
const validateSession = require("../middleware/validate-session");

// Endpoint: http://localhost:4000/tenant/create
router.post("/create", validateSession, async (req, res) => {
    try {
        const { firstName, lastName, phone, email } = req.body

        const tenant = new Tenants({
            user_id: req.user._id,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            active: true,
        })

        const newTenant = await tenant.save()

        res.json({ message: "Tenant created", tenant: newTenant })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/tenant/view-all
router.get("/view-all", validateSession, async (req, res) => {
    try {
        const user_tenants = await Tenants.find({ user_id: req.user._id })

        res.json({ message: "Tenants Retrieved", user_tenants: user_tenants })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/tenants/:id
router.get("/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const tenant = await Tenants.findById(id)

        res.json({ message: "Tenant retrieved", tenant: tenant })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/tenants/update/:id
router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const conditions = { _id: id }
        const data = req.body
        const options = {new: true}

        const tenant = await Tenants.findOneAndUpdate(conditions, data, options)

        if (!tenant) {
            throw new Error("Tenant not found")
        }

        res.json({ message: "Tenant patch success", tenant: tenant })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/tenants/delete/:id
router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const tenant = await Tenants.deleteOne({ _id: id })

        res.json({ message: tenant.deletedCount === 1 ? "Tenant deleted" : "Tenant not deleted"})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;