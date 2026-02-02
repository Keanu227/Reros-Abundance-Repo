const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Poetry is fine — just make it valid JS 😌
console.log(
  "Clarity in code. Trust in design. Every line builds freedom."
);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "frontend")));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Health check (optional but useful)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Rerosperity NFT Hub" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
