const t = require('tap');
const Game = require('./game.js');
const data = require('./data.js');

const game = new Game(data);
t.equal(game.play(), 12);
