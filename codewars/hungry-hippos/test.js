const t = require('tap');
const Game = require('./game.js');

const game = new Game([[1,0,0,0,0],
                       [0,0,1,1,0],
                       [1,0,1,0,1],
                       [1,1,1,1,0],
                       [1,1,1,0,1]]);
t.equal(game.play(), 4);
