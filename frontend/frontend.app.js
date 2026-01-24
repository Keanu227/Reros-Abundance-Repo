<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reros Abundance Repo</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f6f8fa;
      margin: 0;
      padding: 0;
    }
    header {
      background: #24292e;
      color: white;
      padding: 1rem;
    }
    header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    nav {
      background: #e1e4e8;
      padding: 0.5rem;
    }
    nav a {
      margin-right: 1rem;
      text-decoration: none;
      color: #0366d6;
    }
    .container {
      padding: 1rem;
    }
    .repo-card {
      background: white;
      border: 1px solid #d1d5da;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .repo-card h2 {
      margin-top: 0;
    }
    footer {
      background: #24292e;
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>Reros Abundance Repo</h1>
  </header>
  <nav>
    <a href="#" onclick="showSection('overview')">Overview</a>
    <a href="#" onclick="showSection('files')">Files</a>
    <a href="#" onclick="showSection('commits')">Commits</a>
  </nav>
  <div class="container">
    <section id="overview">
      <div class="repo-card">
        <h2>Project Overview</h2>
        <p>Turn digital art into prosperity with our gas‑less minting engine built on Ethereum & Polygon.</p>
      </div>
    </section>
    <section id="files" style="display:none;">
      <div class="repo-card">
        <h2>Files</h2>
        <ul id="fileList">
          <li>package.json</li>
          <li>server.js</li>
          <li>frontend/index.html</li>
        </ul>
      </div>
    </section>
    <section id="commits" style="display:none;">
      <div class="repo-card">
        <h2>Recent Commits</h2>
        <ul id="commitList">
          <li>Initial commit</li>
          <li>Added backend server.js</li>
          <li>Frontend scaffold created</li>
        </ul>
      </div>
    </section>
  </div>
  <footer>
    <p>© 2026 Reros Abundance Repo</p>
  </footer>

  <script>
    function showSection(sectionId) {
      document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
      document.getElementById(sectionId).style.display = 'block';
    }
  </script>
</body>
</html>
