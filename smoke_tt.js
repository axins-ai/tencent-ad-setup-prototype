const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const dir = __dirname;
const files = ['react.production.min.js', 'react-dom.production.min.js', 'shared.js', 'app-toutiao.js'];

const html = '<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>';
const dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost/' });
const { window } = dom;

window.alert = () => {};
window.scrollTo = () => {};
if (window.Element && window.Element.prototype) window.Element.prototype.scrollIntoView = () => {};

let errors = [];
window.addEventListener('error', e => errors.push('window.error: ' + (e.error && e.error.stack || e.message)));

for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  const s = window.document.createElement('script');
  s.textContent = code;
  try {
    window.document.body.appendChild(s);
  } catch (e) {
    errors.push('inject ' + f + ': ' + (e.stack || e));
  }
}

setTimeout(() => {
  const root = window.document.getElementById('root');
  const len = root ? root.innerHTML.length : 0;
  const hasUI = !!window.UI && !!window.UI.MaterialModal && !!window.UI.CopyModal && !!window.UI.TimeGrid && !!window.UI.Notification;
  console.log('TT smoke: rootHTMLLen =', len);
  console.log('TT smoke: window.UI present =', hasUI);
  console.log('TT smoke: errors =', errors.length);
  if (errors.length) errors.slice(0, 8).forEach(e => console.log('  -', e));
  console.log(len > 200 && hasUI && errors.length === 0 ? 'TT SMOKE PASS' : 'TT SMOKE FAIL');
  process.exit(0);
}, 500);
