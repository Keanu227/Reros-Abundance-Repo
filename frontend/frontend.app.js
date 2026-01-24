}
document.getElementById('mint-btn').addEventListener('click', async () => {
  const recipient = "0x1234567890abcdef1234567890abcdef12345678"; // replace with connected wallet
  const tokenURI = "ipfs://Qm.../metadata.json"; // replace with your NFT metadata URI

  try {
    const response = await fetch("http://localhost:3000/mint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, tokenURI })
    });

    const data = await response.json();
    alert(data.success ? `Minted! TxID: ${data.data.txId}` : `Mint failed: ${data.error}`);
  } catch (err) {
    alert("Mint failed—check console");
    console.error(err);
  }
});
