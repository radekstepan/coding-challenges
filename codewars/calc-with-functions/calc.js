const number = (num) => (fn) => (typeof fn === 'function') ? fn(num) : num;
const calc = (operand) => (b) => (a) => eval([a, operand, b].join(''));

module.exports = {
  zero: number(0),
  one: number(1),
  two: number(2),
  three: number(3),
  four: number(4),
  five: number(5),
  six: number(6),
  seven: number(7),
  eight: number(8),
  nine: number(9),
  plus: calc('+'),
  minus: calc('-'),
  times: calc('*'),
  dividedBy: calc('/')
};

// for Codewars
for (let k in module.exports) {
  this[k] = module.exports[k];
}
