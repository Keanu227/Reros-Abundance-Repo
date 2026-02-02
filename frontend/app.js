// API health check
document.getElementById("check").addEventListener("click", async () => {
  const res = await fetch("/api/health");
  const data = await res.json();
  document.getElementById("output").textContent =
    JSON.stringify(data, null, 2);
});

// MetaMask wallet connect
const connectBtn = document.getElementById("connectWallet");
const walletStatus = document.getElementById("walletStatus");

connectBtn.addEventListener("click", async () => {
  if (!window.ethereum) {
    walletStatus.textContent = "MetaMask not detected ❌";
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    walletStatus.textContent = `Connected: ${accounts[0]}`;
  } catch (err) {
    walletStatus.textContent = "Connection rejected";
  }
});
