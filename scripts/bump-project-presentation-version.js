#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const projectRoot = path.join(root, 'projects');
const version = '20260724-project-presentation-v3';
// Triggered once to refresh every project page after the shared visual standard changes.

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(projectRoot).filter((file) => path.basename(file) === 'index.html');
let changed = 0;

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(
    /\/projects\/project-pages\.css\?v=[^"']+/g,
    `/projects/project-pages.css?v=${version}`
  );
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

if (files.length < 7) throw new Error(`Expected at least 7 project pages, found ${files.length}`);
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.includes(`/projects/project-pages.css?v=${version}`)) {
    throw new Error(`Project presentation version missing: ${path.relative(root, file)}`);
  }
}

process.stdout.write(`Updated project presentation CSS version in ${changed} files.\n`);
