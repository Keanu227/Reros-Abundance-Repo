// Mantra
console.log(`
Clarity in code, trust in design,
Every line builds freedom, every step defines.
I start with focus, I run with intent,
My app is my vision, my energy well-spent.
`);

// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());            // Allow requests from your frontend
app.use(express.json());    // Parse JSON bodies

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", service: "666-Hop NFT Backend" });
});

// POST /mint — mock mint endpoint
app.post("/mint", (req, res) => {
  const { recipient, tokenURI } = req.body;

  // Basic validation
  if (!recipient || !tokenURI) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: recipient and tokenURI",
    });
  }

  // Mock transaction ID (replace with real Web3/ethers integration later)
  const mockTxId = `0x${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;

  // Respond with success
  res.json({
    success: true,
    txId: mockTxId,
    recipient,
    tokenURI,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
