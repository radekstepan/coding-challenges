const toInt = input =>
  Array.isArray(input) ?
    parseInt(input.join(''), 10) :
    parseInt(input, 10);

// Sum a parsed list.
const sum = list => {
  let op = null;
  return list.reduce((total, e) => {
    if (typeof e === 'number') {
      total = !op ?
        e : // init
        total + e * (op === '+' ? 1 : -1); // +/-
      
      op = null;
    } else {
      op = e;
    }
    return total;
  }, 0);
};

// Parse input.
const solve = (expr, i = 0) => {
  const list = [];
  let buffer = [];

  const exit = () =>
    i === expr.length ?
      sum(list.concat(buffer.length ? [toInt(buffer)] : [])) :
      [ sum(list), i ];

  while (i < expr.length) {
    const ch = expr.charAt(i);
    const int = toInt(ch);

    if (!Number.isNaN(int)) { // save the digit
      buffer.push(ch);
    } else {
      if (buffer.length) { // save the whole number
        list.push(toInt(buffer));
        buffer = [];
      }

      if (ch === '(') { // recursion
        const res = solve(expr, i + 1);
        list.push(res[0]); // save the result
        i = res[1]; // update the index
      } else if (ch === ')') { // return the sum
        return exit();
      } else {
        list.push(ch); // save the operand
      }
    }

    i++;
  }

  return exit();
};

module.exports = solve;