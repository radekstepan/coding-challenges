var tap = require('tap');

var getMiddle = require('./solution.js');

tap.equal(getMiddle("test"),"es");
tap.equal(getMiddle("testing"),"t");
tap.equal(getMiddle("middle"),"dd");
tap.equal(getMiddle("A"),"A");
