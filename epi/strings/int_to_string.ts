// Implement an integer to string conversion function, and a string to integer conversion function,
// For example, if the input to the first function is the integer 314, it should retum the string "314" and
// if the input to the second function is the string "314" it should return the integer 314.

function int_to_string(n: number): string {
  if (n === 0) {
    return "0";
  }

  let s = "";
  let a = n;
  if (n < 0) {
    s = "-";
    a *= -1;
  }

  const l = Math.ceil(Math.log10(a + 1)); // length

  let i = 0;
  let p: number = 0; // previous
  while (i !== l) {
    const d = 10 ** (l - i - 1);
    s += Math.floor((a - p) / d);
    p = a - a % d;
    i++;
  }

  return s;
}

console.log(int_to_string(-314));
console.log(int_to_string(0));
console.log(int_to_string(314));

function string_to_int(s: string): number {
  let n = 0;
  const l = s.length;

  let i = 0;
  while (i !== l) {
    const d = 10 ** (l - i - 1);
    n += d * Number(s[i]);
    i++;
  }

  return n;
}

console.log(string_to_int("314"));
