const t = require('tap');
const Game = require('./game.js');
const data = require('./data.js');

const game = new Game(data);
t.equal(game.play(), 12);
t.deepEqual(game.rows, [ 7, 9, 9, 8, 10, 10, 11, 12, 11, 9, 8, 9, 11, 13, 11, 12, /*15, 12, 12, 12, 12, 16, 16, 18, 20, 22, 22*/ ]);
