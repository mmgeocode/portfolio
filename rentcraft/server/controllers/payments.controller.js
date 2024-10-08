const router = require("express").Router();
const Payments = require("../models/payments.model")
const validateSession = require("../middleware/validate-session")

// Endpoint: http://localhost:4000/payments/create
router.post("/create", validateSession, async (req, res) => {
    try {
        const payment = new Payments({
            unit_id: req.body.unit_id,
            tenant_id: req.body.tenant_id,
            user_id: req.user._id,
            date: req.body.date,
            amount: req.body.amount,
            paymentState: req.body.paymentState,
        })

        const newPayment = await payment.save()

        res.json({ message: "Payment created", payment: newPayment })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/payments/view-all
router.get("/view-all", validateSession, async (req, res) => {
    try {
        const payments = await Payments.find({ user_id: req.user._id })

        res.json({ message: "View all payments", payments: payments})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/payments/:id
router.get("/:id", validateSession, async (req, res) => {
    try {
        const payment = await Payments.findById({ _id: req.params.id })

        res.json({ message: "Get payment by ID success", payment: payment })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/payments/unit/:id
router.get("/unit/:id", validateSession, async (req, res) => {
    try {
        const unit_payments = await Payments.find({ unit_id: req.params.id })

        res.json({ message: "Get all payments by unit success", unit_payments: unit_payments })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/payments/tenant/:id
router.get("/tenant/:id", validateSession, async (req, res) => {
    try {
        const tenant_payments = await Payments.find({ tenant_id: req.params.id })

        res.json({ message: "Get all payments by tenant success", tenant_payments: tenant_payments })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Endpoint: http://localhost:4000/payments/update/:id
router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id
        const conditions = { _id: id }
        const data = req.body
        const options = { new: true }

        const payment = await Payments.findOneAndUpdate(conditions, data, options)

        if (!payment) {
            throw new Error("Payment not found")
        }

        res.json({ message: "Payment successfully patched", payment: payment })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router