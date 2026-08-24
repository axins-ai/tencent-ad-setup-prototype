const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

// Usage: node compile_one.js <src.jsx> <out.js>
const srcPath = path.join(__dirname, process.argv[2]);
const outPath = path.join(__dirname, process.argv[3]);

const src = fs.readFileSync(srcPath, 'utf8');
console.log('Reading:', srcPath, '(', src.length, 'chars )');

const result = babel.transformSync(src, {
  filename: path.basename(srcPath),
  configFile: false,
  babelrc: false,
  presets: [['@babel/preset-react', { runtime: 'classic' }]],
  plugins: [],
  sourceType: 'script',
});

fs.writeFileSync(outPath, result.code, 'utf8');
console.log('Written:', outPath, '(', result.code.length, 'chars )');
