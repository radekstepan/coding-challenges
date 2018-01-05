const fs = require('fs');
const glob = require('glob');
const yaml = require('js-yaml');
const t = require('tap');

const solve = require('./solve.js');

const p = text => text.trim().split('\n').map(r => r.trim().split(''));

glob('fixtures/*.yaml', (err, matches) => {
  matches.map(file => {
    const {input, output} = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    t.equal(solve(p(input)), p(output), file);
  });
});
