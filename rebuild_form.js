const fs = require('fs');
const path = require('path');

const formPath = path.join(__dirname, 'form.html');
const outPath = path.join(__dirname, 'form_new.html');

let html = fs.readFileSync(formPath, 'utf8');

// 1. 去掉 Babel Standalone CDN 那一行
html = html.replace(/<script crossorigin src="https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js"><\/script>\s*\n/, '');

// 2. 找到 <script type="text/babel"> 和对应的 </script>（在 </body> 之前）
const babelStart = '<script type="text/babel">';
const babelIdx = html.indexOf(babelStart);
if (babelIdx === -1) {
  console.error('Could not find babel script start');
  process.exit(1);
}

// 找到 </body> 之前的 </script>
const bodyIdx = html.indexOf('</body>');
const scriptEndIdx = html.lastIndexOf('</script>', bodyIdx);

if (scriptEndIdx === -1) {
  console.error('Could not find closing script tag');
  process.exit(1);
}

// 重建：babel script 之前的部分 + 新的 script src + </body></html>
const before = html.substring(0, babelIdx);
const after = html.substring(scriptEndIdx + '</script>'.length);

const newHtml = before + 
  '<script src="app.js"></script>\n' + 
  after;

fs.writeFileSync(outPath, newHtml, 'utf8');
console.log('Written to', outPath);
console.log('Original size:', html.length, 'New size:', newHtml.length);
console.log('Lines in new file:', newHtml.split('\n').length);
