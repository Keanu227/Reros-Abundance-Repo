let provider;
let signer;
let contract;

const connectBtn = document.getElementById("connectWallet");
const walletStatus = document.getElementById("walletStatus");
const mintBtn = document.getElementById("mintNFT");
const mintStatus = document.getElementById("mintStatus");
const gallery = document.getElementById("nftGallery");

// Replace with your deployed contract address
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

// Paste ABI from Remix (ERC721)
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mintNFT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "tokenURI",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];

connectBtn.addEventListener("click", async () => {
  if (!window.ethereum) return walletStatus.textContent = "MetaMask not detected ❌";

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    walletStatus.textContent = `Connected: ${accounts[0]}`;
  } catch (err) {
    walletStatus.textContent = "Connection rejected ❌";
  }
});

mintBtn.addEventListener("click", async () => {
  if (!contract || !signer) return alert("Connect wallet first!");

  try {
    const tokenURI = "https://example.com/nft.json"; // Replace with real JSON URL
    const tx = await contract.mintNFT(await signer.getAddress(), tokenURI);
    await tx.wait();
    mintStatus.textContent = "NFT minted successfully ✅";
    loadGallery(tokenURI);
  } catch (err) {
    console.error(err);
    mintStatus.textContent = "Mint failed ❌";
  }
});

function loadGallery(tokenURI) {
  const nftCard = document.createElement("div");
  nftCard.classList.add("nftCard");
  nftCard.innerHTML = `<p>Minted NFT:</p><a href="${tokenURI}" target="_blank">${tokenURI}</a>`;
  gallery.appendChild(nftCard);
}
