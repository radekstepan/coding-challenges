function countSmileys(arr) {
  return arr.reduce(function(count, string) {
    return count + /^[:;][-~]?[\)D]$/.test(string);
  }, 0);
}
