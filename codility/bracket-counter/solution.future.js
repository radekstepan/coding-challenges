module.exports = function solution(S) {
  var C = { A: {}, B: {} }, // count to index for both brackets
      c = [0, 0],           // opening/closing bracket counters
      l = S.length;

  for (var i = 0; i < l; i++) { // go forward counting both brackets
    if (S[i] === 'A') {
      C.A[++c[0]] = i;
    } else {
      C.B[++c[1]] = i;
    }
    // TODO skip if we have more opening brackets than chars remaining.
  }

  if (!c[1]) return 0; // we only have opening brackets
  if (!c[0]) return l; // we only have closing brackets

  // Go through the closing brackets.
  // TODO pick the smaller of the two sets.
  for (var k in C.B) {
    k = Number(k);
    i = c[1] - k; // the index for closing is remainder

    // TODO skip if we are not in search space

    // Ranges of this count.
    var a = [ C.A[k], c[0] === k ? l - 1 : C.A[k + 1] - 1 ];
    var b = [ c[1] === k ? 0 : C.B[i], C.B[i + 1] - 1 ];

    // Find the overlap between the two ranges.
    // TODO determine overlap first before iterating.
    for (var m = a[0]; m <= a[1]; m++) {
      for (var n = b[0]; n <= b[1]; n++) {
        if (m === n) return m + 1;
      }
    }
  }
}
