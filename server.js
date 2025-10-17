const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Vibe Hackathon Payment API is running 🎉");
});

// Example: Flutterwave payment
app.post("/pay", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: Date.now().toString(),
        amount: req.body.amount,
        currency: "KES",
        redirect_url: "https://your-site.com/callback",
        customer: {
          email: req.body.email,
          name: req.body.name,
        },
        payment_options: "card,mpesa,ussd",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
