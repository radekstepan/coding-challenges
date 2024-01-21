// Implement a function that converts a spreadsheet column id to the corresponding integer, with "A"
// corresponding to 1. For example, you should return 4 for "D", 27 for "AA", 702 for "ZZ", etc.

const A = 'A'.charCodeAt(0);

function ss_decode_col_id(col: string): number {
  let n = 0;
  const l = col.length;

  let i = 0;
  while (i !== l) {
    const ch = col.charCodeAt(i);
    n += (ch - A + 1) * (26 ** (l - i - 1));
    i++;
  }

  return n;
}

const ss_decode_col_id_epi = (col: string): number =>
  Array.from(col).reduce((result, c) =>
    result * 26 + c.charCodeAt(0) - A + 1
  , 0);

console.log(ss_decode_col_id("D")); // 4
console.log(ss_decode_col_id("M")); // 13
console.log(ss_decode_col_id("AA")); // 27
console.log(ss_decode_col_id("BZ")); // 78
console.log(ss_decode_col_id("ZY")); // 701
console.log(ss_decode_col_id("ZZ")); // 702
console.log(ss_decode_col_id("CCC")); // 2109

// Implement a function that converts an integer to the spreadsheet column id. For example,
// you should return "D" for 4, "AA" for 27, and "ZZ" for 702.

function encode_col_n(n: number): string {
  const s = [];

  while (n) {
    n--; // A = 1
    s.push(String.fromCharCode(A + n % 26)); // use the remainder
    n = Math.floor(n / 26);
  }

  return s.reverse().join('');
}

console.log(encode_col_n(4)); // D
console.log(encode_col_n(13)); // M
console.log(encode_col_n(27)); // AA
console.log(encode_col_n(78)); // BZ
console.log(encode_col_n(701)); // ZY
console.log(encode_col_n(702)); // ZZ
console.log(encode_col_n(2109)); // CCC
