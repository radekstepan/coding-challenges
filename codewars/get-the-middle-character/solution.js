module.exports = function solution(s) {
  var m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : s.substring(m - 1, m + 1);
}
