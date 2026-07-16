// Headless smoke test for nav.js (task-list app)
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const PROJECT = '/Users/axins/WorkBuddy/2026-06-12-16-33-35/ad-prototype';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
  runScripts: 'outside-only'
});

const { window } = dom;
// React's legacy IE input-event polyfill touches attachEvent
window.HTMLElement.prototype.attachEvent = function () {};
window.Element.prototype.attachEvent = function () {};

// Expose jsdom globals to nav.js (which references React/ReactDOM/document/localStorage as free globals)
global.window = window;
global.document = window.document;
global.navigator = window.navigator;
global.localStorage = window.localStorage;
global.alert = () => {};

const React = require('react');
const reactDomMain = require('react-dom');
const reactDomClient = require('react-dom/client');
global.React = React;
global.ReactDOM = Object.assign({}, reactDomMain, reactDomClient);

// Seed a sample task so cards (and the edit button) render
window.localStorage.setItem('ad_tasks', JSON.stringify([
  {
    id: 'task_1',
    name: '测试任务-618大促',
    channel: 'gdt',
    channelName: '广点通',
    createdAt: new Date().toISOString(),
    status: 'draft'
  }
]));

// Load and execute nav.js in this global scope
const navSrc = fs.readFileSync(path.join(PROJECT, 'nav.js'), 'utf8');
const vm = require('vm');
const ctx = {
  React: global.React,
  ReactDOM: global.ReactDOM,
  window: global.window,
  document: global.document,
  navigator: global.navigator,
  localStorage: global.localStorage,
  console: console,
  setTimeout: setTimeout,
  Date: Date,
  Math: Math,
  JSON: JSON,
  alert: global.alert
};
vm.createContext(ctx);
vm.runInContext(navSrc, ctx);

// React 18 createRoot.render flushes async-ish; wait a tick
setTimeout(() => {
  const html = window.document.getElementById('root').innerHTML;
  const results = {
    title_present: html.includes('批创工具'),
    task_card_present: html.includes('测试任务-618大促'),
    channel_label_present: html.includes('广点通'),
    edit_button_present: html.includes('编辑'),
    run_button_present: html.includes('运行任务'),
    new_task_button_present: html.includes('新建任务'),
    edit_icon_class: html.includes('fa-edit')
  };
  // Count edit vs run buttons (should be >=1 each in the card)
  const editCount = (html.match(/编辑/g) || []).length;
  const runCount = (html.match(/运行任务/g) || []).length;
  results.edit_button_count = editCount;
  results.run_button_count = runCount;

  console.log('=== nav.js smoke test ===');
  console.log(JSON.stringify(results, null, 2));

  const ok = results.title_present && results.task_card_present &&
             results.edit_button_present && results.run_button_present &&
             results.edit_icon_class && editCount >= 1 && runCount >= 1;
  console.log(ok ? 'SMOKE_TEST_PASS' : 'SMOKE_TEST_FAIL');
  process.exit(ok ? 0 : 1);
}, 200);
