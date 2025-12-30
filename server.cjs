const express = require('express');
const path = require('path');

const app = express();

const distPath = path.join(__dirname, 'dist');
console.log('Current directory:', __dirname);
console.log('Serving static files from:', distPath);
console.log('Dist directory exists:', require('fs').existsSync(distPath));

// Serve static files from the dist directory
app.use(express.static(distPath));

// Handle client-side routing - send all requests to index.html
app.get('*', (req, res) => {
  console.log('Serving request for:', req.path);
  const indexPath = path.join(distPath, 'index.html');
  console.log('Index path:', indexPath);
  console.log('Index file exists:', require('fs').existsSync(indexPath));
  res.sendFile(indexPath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});