let provider;
let signer;
let contract;

const connectBtn = document.getElementById("connectWallet");
const walletStatus = document.getElementById("walletStatus");
const mintBtn = document.getElementById("mintNFT");
const mintStatus = document.getElementById("mintStatus");
const gallery = document.getElementById("nftGallery");

// ✅ Replace this with your deployed contract address
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

// ✅ ERC721 ABI (minimal, just what we need)
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {"internalType": "address","name":"recipient","type":"address"},
      {"internalType": "string","name":"tokenURI","type":"string"}
    ],
    "name":"mintNFT",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "name":"tokenURI",
    "outputs":[{"internalType":"string","name":"","type":"string"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"tokenCounter",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  }
];

// 🌟 Connect Wallet
connectBtn.addEventListener("click", async () => {
  if (!window.ethereum) {
    walletStatus.textContent = "MetaMask not detected ❌";
    return;
  }

  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);

    const accounts = await provider.send("eth_requestAccounts", []);
    walletStatus.textContent = `Connected: ${accounts[0]}`;

    await loadAllNFTs(); // load gallery after connecting
  } catch (err) {
    console.error(err);
    walletStatus.textContent = "Connection rejected ❌";
  }
});

// 🌟 Mint NFT
mintBtn.addEventListener("click", async () => {
  if (!contract || !signer) {
    alert("Connect wallet first!");
    return;
  }

  try {
    // Replace with your actual metadata URL
    const tokenURI = "https://example.com/nft.json"; 
    const tx = await contract.mintNFT(await signer.getAddress(), tokenURI);
    await tx.wait();

    mintStatus.textContent = "NFT minted successfully ✅";

    // Reload gallery with new NFT
    await loadAllNFTs();
  } catch (err) {
    console.error(err);
    mintStatus.textContent = "Mint failed ❌";
  }
});

// 🌟 Load all NFTs from contract
async function loadAllNFTs() {
  if (!contract) return;

  gallery.innerHTML = ""; // clear old content

  let total;
  try {
    total = await contract.tokenCounter();
  } catch (err) {
    console.error("Failed to get tokenCounter", err);
    return;
  }

  for (let i = 1; i < total; i++) {
    try {
      const uri = await contract.tokenURI(i);
      const nftCard = document.createElement("div");
      nftCard.classList.add("nftCard");
      nftCard.innerHTML = `
        <p>NFT #${i}</p>
        <a href="${uri}" target="_blank">${uri}</a>
      `;
      gallery.appendChild(nftCard);
    } catch (err) {
      console.error("Failed to load NFT", i, err);
    }
  }
}
