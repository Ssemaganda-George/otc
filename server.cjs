const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

// Try to find the dist directory
let distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log('Dist not found in __dirname, trying process.cwd()');
  distPath = path.join(process.cwd(), 'dist');
}
if (!fs.existsSync(distPath)) {
  console.log('Dist not found in process.cwd(), trying relative path');
  distPath = path.join(__dirname, '..', 'dist');
}

console.log('Final dist path:', distPath);
console.log('Dist directory exists:', fs.existsSync(distPath));

// Serve static files from the dist directory
app.use(express.static(distPath));

// Handle client-side routing - send all requests to index.html
app.get('*', (req, res) => {
  console.log('Serving request for:', req.path);
  const indexPath = path.join(distPath, 'index.html');
  console.log('Index path:', indexPath);
  console.log('Index file exists:', fs.existsSync(indexPath));

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Index file not found');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});