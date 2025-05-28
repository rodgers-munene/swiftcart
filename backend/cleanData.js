const fs = require('fs');

const raw = fs.readFileSync('./products.json', 'utf-8');
const lines = raw.trim().split('\n');

// Convert each line to a JS object
const objects = lines.map(line => JSON.parse(line));

// Save as a proper JSON array
fs.writeFileSync('products_cleaned.json', JSON.stringify(objects, null, 2));

console.log('✅ Cleaned and converted to valid JSON array');
