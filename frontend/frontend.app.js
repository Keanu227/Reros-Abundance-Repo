document.getElementById("mintForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const recipient = document.getElementById("recipient").value;
  const tokenURI = document.getElementById("tokenURI").value;

  const res = await fetch("/mint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipient, tokenURI })
  });

  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
});
