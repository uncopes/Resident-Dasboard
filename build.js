const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Run webpack build
console.log('Building application...');
execSync('npx webpack --mode production', { stdio: 'inherit' });

console.log('Build completed successfully!'); 