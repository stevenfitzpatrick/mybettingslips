#!/usr/bin/env node

const kleur = require('kleur');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/* eslint-disable no-console */

/**
 * Helper to deploy dist folder to AWS
 */

(async () => {
  // Move Public files to dist
  await exec('cp ./public/manifest.json ./dist');

  console.log(kleur.green.bold.underline('Manifest moved...'));

  await exec('cp ./public/robots.txt ./dist');

  console.log(kleur.green.bold.underline('Robots.txt moved...'));

  // Copy files to AWS
  await exec(
    'aws s3 rm s3://mybettingslips.com/ --recursive && aws s3 cp ./dist s3://mybettingslips.com/ --recursive --metadata-directive REPLACE --cache-control private,no-cache,max-age=0 --exclude "*" --include index.html --include sw.js && aws s3 cp ./dist s3://mybettingslips.com/ --recursive --metadata-directive REPLACE --cache-control public,max-age=31536000,immutable  --exclude index.html --exclude sw.js && aws s3 cp s3://mybettingslips.com/ s3://mybettingslips.com/ --recursive --metadata-directive REPLACE --cache-control public,max-age=31536000,immutable  --content-type="font/woff2" --no-guess-mime-type --exclude "*" --include "*.woff2"'
  );

  console.log(kleur.green.bold.underline('AWS Deploy complete'));
})();
