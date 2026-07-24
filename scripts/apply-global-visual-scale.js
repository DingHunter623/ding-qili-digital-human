#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'site-navigation.js');
let source = fs.readFileSync(file, 'utf8');

source = source.replace(
  "var SHARED_ASSET_VERSION = '20260723-site-search-v1';",
  "var SHARED_ASSET_VERSION = '20260724-global-type-v1';\n  var VISUAL_SCALE_VERSION = '20260724-global-type-v1';"
);

if (!source.includes('function addVisualScaleStylesheet()')) {
  const marker = "\n  function buildNavigation() {";
  const loader = `
  function addVisualScaleStylesheet() {
    var current = document.getElementById('qilyVisualScaleStylesheet');
    if (current) {
      current.href = '/site-visual-scale-v1.css?v=' + VISUAL_SCALE_VERSION;
      return;
    }
    var link = document.createElement('link');
    link.id = 'qilyVisualScaleStylesheet';
    link.rel = 'stylesheet';
    link.href = '/site-visual-scale-v1.css?v=' + VISUAL_SCALE_VERSION;
    document.head.appendChild(link);
  }
`;
  if (!source.includes(marker)) throw new Error('Cannot locate buildNavigation marker');
  source = source.replace(marker, `${loader}${marker}`);
}

source = source.replace(
  "  function boot() {\n    addStylesheet();\n    buildNavigation();",
  "  function boot() {\n    addStylesheet();\n    addVisualScaleStylesheet();\n    buildNavigation();"
);

if (!source.includes("site-visual-scale-v1.css")) throw new Error('Visual scale stylesheet loader was not added');
if (!source.includes('addVisualScaleStylesheet();')) throw new Error('Visual scale stylesheet is not called during boot');

fs.writeFileSync(file, source);
process.stdout.write('Global visual scale stylesheet loader applied.\n');
