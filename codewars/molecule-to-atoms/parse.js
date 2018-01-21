const OPEN_BRACKET = '[';
const CLOSE_BRACKET = ']';
const NUMBER = 'number'

const Molecule = function(formula) {
  const molecule = formula.match(/\W|\d+|([A-Z][a-z]*)/g);
  let i = 0;

  return {
    next: () => {
      molecule[i] = (function(n) {
        if (isNaN(n)) {
          switch(['{', '[', '(', '}', ']', ')'].indexOf(n)) {
            case -1:
              return n;
            case 0:
            case 1:
            case 2:
              return OPEN_BRACKET;
            default:
              return CLOSE_BRACKET;
          }
        } else {
          return parseInt(n, 10);
        }
      })(molecule[i]);
      return molecule[i++];
    },
    get last() {
      return molecule[i - 2];
    }
  }
};

const Stack = function() {
  const stack = [{}];
  let i = 0;

  return {
    merge: multiplier => {
      const group = stack.pop();
      i -= 1;
      for (let k in group) {
        if (stack[i][k]) {
          stack[i][k] += group[k] * multiplier;
        } else {
          stack[i][k] = group[k] * multiplier;
        }
      }
    },
    group: () => {
      stack.push({});
      i += 1;
    },
    add: (atom, count = 1) => {
      stack[i][atom] = atom in stack[i] ? count + stack[i][atom] : count;
    },
    get: () => stack.pop()
  };
};

module.exports = formula => {
  const molecule = new Molecule(formula);
  const stack = new Stack();

  let curr;
  while (curr = molecule.next()) {
    if (molecule.last === CLOSE_BRACKET) {
      if (typeof curr === NUMBER) {
        // Group * curr & sum w/ previous group.
        stack.merge(curr);
        continue;
      } else {
        // Group * 1 & sum w/ previous group.
        stack.merge(1);
      }
    }

    switch (true) {
      case curr === CLOSE_BRACKET:
        break;
      // A new group.
      case curr === OPEN_BRACKET:
        stack.group();
        break;
      // Adjust atom count.
      case typeof curr === NUMBER:
        stack.add(molecule.last, curr - 1);
        break;
      // Atom * 1 to the stack.
      default:
        stack.add(curr);
    }
  }

  return stack.get();
}
