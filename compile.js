const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const srcPath = path.join(__dirname, 'source_33a3c4b.jsx');
const outPath = path.join(__dirname, 'app_compiled.js');

console.log('Reading:', srcPath);
const src = fs.readFileSync(srcPath, 'utf8');
console.log('Source length:', src.length, 'chars');

console.log('Transforming with Babel...');
const result = babel.transformSync(src, {
  filename: 'source.jsx',
  presets: [['@babel/preset-react', { runtime: 'classic' }]],
  plugins: [],
  sourceType: 'script',
});

console.log('Transform complete, output length:', result.code.length, 'chars');
fs.writeFileSync(outPath, result.code, 'utf8');
console.log('Written to:', outPath);
