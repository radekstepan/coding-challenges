// From Coding Interview with Dan Abramov
// @link https://youtu.be/XEt09iK8IXs?t=1258

let t = 0; // try counter
const s = 10; // search space size
let r = Math.floor(Math.random() * s); // rabbit

// Take a guess.
const guess = g => {
  t += 1;
  console.log('Try', t, 'in', g, 'rabbit in', r);

  if (g === r) {
    return true;
  }

  // Rabbit jumping.
  if (!r) {
    r += 1;
  } else if (r === s) {
    r -= 1;
  } else {
    r += Math.random() > 0.5 ? 1 : -1;
  }
}

// Search.
let direction = 1; // forward
let g = 0;
while (true) {
  if (guess(g)) {
    break;
  }

  if (g === s && direction === 1) {
    direction = -1; // go back
  } else {
    g += 1 * direction;
  }

  if (g === 0) {
    throw new Error('Sanity check');
  }
}

console.log('Found in hole', r, 'on try', t);
