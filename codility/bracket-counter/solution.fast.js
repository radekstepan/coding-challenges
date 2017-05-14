module.exports = function solution(S) {
  var A = {}, // hold the count of opening bracket changes
      c = 0,  // opening/closing bracket counter, always starts at 0
      l = S.length;

  for (var i = 0; i < l; i++) {   // go forward counting opening brackets
    if (S[i] === 'A') A[++c] = i; // encountered opening bracket
    if (c === (l - i + 1)) break; // skip if we have more than enough opening
  }

  if (c === l) return 0; // we have 0 closing brackets

  function a(j, c) { // is count of brackets at position j equal to c?
    return c in A && A[c] === j || A[c + 1] > j; // straight match or within range
  }

  for (var j = l - 1, c = 0; j >= 0; j--) { // go backward counting closing brackets
    if (S[j] === 'B') c++;                  // encountered closing bracket "to right"
    if (j > i) continue;                    // not our search space
    if (a(j - 1, c)) {                      // 0th index has 0 opening to the left
      return j;                             // found!
    }
  }

  return l; // we only have closing brackets
}
