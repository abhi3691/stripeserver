
require('dotenv').config()
const express = require("express")
const cors = require('cors')
const app = express()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const PORT = 8000;

app.use(express.json())
app.use(cors())
app.post('/play', async (req, res) => {
    try {
        const { name } = req.body
        if (!name) return res.status(400).json({ messsage: "Please enter a name" })
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(25 * 100),
            currency: "INR",
            payment_method_types: ["card"],
            metadata: { name }
        })
        const clintSecret = paymentIntent.client_secret;
        res.json({ message: "Payemnt initiated", clintSecret })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ messsage: "Internal server error" })
    }
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


