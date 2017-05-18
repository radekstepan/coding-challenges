const t = require('tap');
const soundex = require('./soundex.js');

t.equal(soundex('Sarah Connor'), 'S600 C560');
t.equal(soundex('Sara Conar'), 'S600 C560');
t.equal(soundex('Serah Coner'), 'S600 C560');
t.equal(soundex('Sarh Connor'), 'S600 C560');
t.equal(soundex('Sayra Cunnarr'), 'S600 C560');
t.equal(soundex('Tymczak'), 'T522');
t.equal(soundex('Ashcraft'), 'A261');
t.equal(soundex('uryrtkzp'), 'U663');
t.equal(soundex('zxqurlwbx'), 'Z641');
t.equal(soundex('Pfister'), 'P236');
