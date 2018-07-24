module.exports = input =>
  input.reduce((list, e, i) => {
    const [head, ...tail] = list;

    if (typeof head === 'undefined') return [e]; // begin

    if (Array.isArray(head)) { // existing range
      const [a, b] = head;
      if (b + 1 === e) { // extend range
        if (input.length - 1 === i) { // last item in the input?
          list[0] = `${a}-${e}`;
        } else {
          list[0] = [a, e];
        }
      } else {
        if (a + 1 === b) { // range too small
          list[0] = a;
          list.unshift(b);
        } else {
          list[0] = `${a}-${b}`; // merge range
        }
        list.unshift(e);
      }
    } else {
      if (head + 1 === e) { // new range
        list[0] = [head, e];
      } else { // single item
        list.unshift(e);
      }
    }

    return list;
  }, []).reverse().join(',');
