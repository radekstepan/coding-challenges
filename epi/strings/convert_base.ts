// Write a program to perform base conversion.

const c = (ch: string): number => {
  const n = Number(ch);
  if (!Number.isNaN(n)) {
    return n;
  }
  return ch.charCodeAt(0) - 55;
}

function convert_base(input: string, b1: number, b2: number): string {
  // Convert to base 10 number.
  let n = 0;
  const l = input.length;
  let i = 0;
  while (i !== l) {
    const ch = input.charAt(i);
    const d = c(ch);
    n += d * b1 ** (l - i - 1);
    i++;
  }

  // Find highest power of b2.
  i = 1;
  while (b2 ** i < n) {
    i++;
  }
  i--;

  // Convert from base 10.
  const s = [];
  while (n) {
    const r = b2 ** i;
    const x = Math.floor(n / r);
    if (x < 10) {
      s.push(x);
    } else {
      s.push(String.fromCharCode(55 + x));
    }
    n -= x * r;
    i--;
  }

  return s.join("");
}

console.log(convert_base("615", 10, 10));
console.log(convert_base("615", 7, 13)); // 1A7
