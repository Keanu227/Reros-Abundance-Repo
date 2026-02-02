// ----------------- Wallet & NFT Setup -----------------
let provider, signer, contract;
const connectBtn = document.getElementById("connectWallet");
const walletStatus = document.getElementById("walletStatus");
const mintBtn = document.getElementById("mintNFT");
const mintStatus = document.getElementById("mintStatus");
const gallery = document.getElementById("nftGallery");

// Replace with your NFT contract address
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

// Minimal ERC721 ABI
const abi = [
  { "inputs": [], "name":"tokenCounter", "outputs":[{"internalType":"uint256","name":"","type":"uint256"}], "stateMutability":"view","type":"function" },
  { "inputs":[{"internalType":"uint256","name":"","type":"uint256"}], "name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}], "stateMutability":"view","type":"function" },
  { "inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function" }
];

// Connect wallet
connectBtn.addEventListener("click", async () => {
  if (!window.ethereum) return walletStatus.textContent = "MetaMask not detected ❌";
  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    const accounts = await provider.send("eth_requestAccounts", []);
    walletStatus.textContent = `Connected: ${accounts[0]}`;
    await loadAllNFTs();
  } catch (err) {
    console.error(err);
    walletStatus.textContent = "Connection rejected ❌";
  }
});

// Mint NFT
mintBtn.addEventListener("click", async () => {
  if (!contract || !signer) return alert("Connect wallet first!");
  try {
    const tokenURI = "https://example.com/nft.json"; // Replace with your metadata
    const tx = await contract.mintNFT(await signer.getAddress(), tokenURI);
    await tx.wait();
    mintStatus.textContent = "NFT minted successfully ✅";
    await loadAllNFTs();
  } catch (err) {
    console.error(err);
    mintStatus.textContent = "Mint failed ❌";
  }
});

// Load NFTs with images
async function loadAllNFTs() {
  if (!contract) return;
  gallery.innerHTML = "";
  let total;
  try { total = await contract.tokenCounter(); } catch (err) { console.error(err); return; }

  for (let i = 1; i < total; i++) {
    try {
      const uri = await contract.tokenURI(i);
      const metadataRes = await fetch(uri);
      const metadata = await metadataRes.json();
      const nftCard = document.createElement("div");
      nftCard.classList.add("nftCard");
      nftCard.innerHTML = `
        <img src="${metadata.image}" alt="${metadata.name}" />
        <h3>${metadata.name}</h3>
        <p>${metadata.description}</p>
        <p>Price: ${metadata.price || "N/A"} ETH</p>
        <p>Royalty: ${metadata.royalty || "N/A"}%</p>
      `;
      gallery.appendChild(nftCard);
    } catch (err) { console.error("Failed to load NFT", i, err); }
  }
}

// ----------------- AI Wealth Guide -----------------
const chatLog = document.getElementById("chatLog");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendMessage");

sendBtn.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.textContent = `🧠 You: ${text}`;
  chatLog.appendChild(userMsg);
  userInput.value = "";

  const aiMsg = document.createElement("div");
  aiMsg.textContent = "🔥 AI Guide: ...thinking";
  chatLog.appendChild(aiMsg);

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    aiMsg.textContent = `🔥 AI Guide: ${data.reply}`;
  } catch (err) {
    console.error(err);
    aiMsg.textContent = "⚠️ Energy turbulence detected — AI Guide offline.";
  }
});
