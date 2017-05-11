const t = require('tap');
const Game = require('./game.js');
const data = require('./data.js');

const game = new Game(data);
t.equal(game.play(), 7);//10);
// t.deepEqual(game.rows, [ 3, 5, 4, 5, 5, 6, 9, 7, 7, /*8, 7, 7, 7, 9, 11, 10*/ ]);
