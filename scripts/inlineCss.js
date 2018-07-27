#!/usr/bin/env node

/* eslint-disable no-console */

/**
 * Helper to inline css into index.html after webpack build
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const cheerio = require('cheerio');

// Variables
const INPUT = path.resolve(__dirname, '..', 'dist', 'index.html');
const CSS = path.resolve(__dirname, '..', 'dist', 'main.css');

// Helpers
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Attempt to read index html
(async () => {
  const indexFile = await readFile(path.resolve(INPUT), 'utf8');
  const cssFile = await readFile(CSS, 'utf8');

  console.time('Inline css');
  const $ = cheerio.load(indexFile);

  const cssFileSelector = 'link[href$="main.css"]';

  $(cssFileSelector).after(`<style>${cssFile}</style>`);
  $(cssFileSelector).remove();

  await writeFile(INPUT, $.html());
  console.timeEnd('Inline css');
  const stats = fs.statSync(INPUT);
  console.log(`Final size is ${stats.size / 1000.0}kb`);
})();
