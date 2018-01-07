const fs = require('fs');
const glob = require('glob');
const yaml = require('js-yaml');
const t = require('tap');

const solve = require('./solve.js');

const p = text => text.trim().split('\n').map(r => r.trim().split(''));

glob('fixtures/*.yaml', (err, matches) => {
  matches.map(file => {
    let {input, expected} = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    const board = p(input);
    solve(board); // requirement to modify in place
    expected = p(expected);
    const [w, h] = [expected[0].length, expected.length];
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        t.equal(board[r][c], expected[r][c], `FILE: ${file} ROW: ${r} COL: ${c}`);
      }
    }
  });
});
