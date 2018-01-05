const fs = require('fs');
const glob = require('glob');
const yaml = require('js-yaml');
const t = require('tap');

const solve = require('./solve.js');

const p = text => text.trim().split('\n').map(r => r.trim().split(''));

glob('fixtures/*.yaml', (err, matches) => {
  matches.map(file => {
    let {input, expected} = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    const solved = solve(p(input));
    expected = p(expected);
    const [w, h] = [solved[0].length, solved.length];
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        t.equal(solved[r][c], expected[r][c], `FILE: ${file} ROW: ${r} COL: ${c}`);
      }
    }
  });
});
