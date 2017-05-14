var solution = require('./solution.future.js');

function arr(l, c) {
  return Array.apply(null, { length: l }).map(function() { return c; });
}

// TODO ABBBBBBBBBBBBBB as a worst case scenario.
var tests = [
  [ 'AABAB', 2 ],
  [ 'AABB', 2 ],
  [ 'AABBBBA', 4 ],
  [ 'AA', 0 ],
  [ 'BB', 2 ],
  [ '', 0 ],
  [ 'ABAB', 2 ],
  [ 'AAABBAB', 3 ],
  [ 'BABA', 2 ],
  [ 'AAB', 1 ],
  [ 'AAABBABAABBBBA', 7 ],
  [ arr(1e5, 'A').concat(arr(1e5, 'B')).join(''), 1e5 ],
  [ arr(1e3, 'AAABBAB').concat(arr(1e3, 'AABBBBA')).join(''), 7e3 ],
  [ arr(3, 'A').concat(arr(3, 'B')).join(''), 3 ]
];

tests.forEach(function(test) {
  var a = solution(test[0]), b = test[1];
  if (a !== b) console.log(test[0], 'expected', b, 'got', a);
});
