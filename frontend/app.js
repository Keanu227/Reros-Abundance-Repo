document.getElementById("check").addEventListener("click", async () => {
  const res = await fetch("/api/health");
  const data = await res.json();
  document.getElementById("output").textContent =
    JSON.stringify(data, null, 2);
});
