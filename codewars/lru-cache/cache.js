function List(maxCapacity) {
  let head = null,
      tail = null,
      size = 0,
      items = {},
      capacity = maxCapacity;

  const push = (k, v) => {
    remove(k);

    if (head !== null) {
      items[head].prev = k;
    }

    items[k] = {
      prev: null,
      next: head,
      val: v
    }
    head = k;
    size++;

    if (tail === null) {
      tail = k;
    }

    resize(capacity);
  }

  const remove = (k) => {
    if (k in items) {
      const item = items[k];

      if (item.prev !== null) {
        items[item.prev].next = item.next;
      } else {
        head = item.next;
      }
      if (item.next !== null) {
        items[item.next].prev = item.prev;
      } else {
        tail = item.prev;
      }

      size--;
      return delete items[k];
    }
    return false;
  }

  const resize = (maxCapacity) => {
    capacity = maxCapacity;
    while(size > capacity) {
      remove(tail);
    }
    return true;
  }

  const get = (k) => {
    if (k in items) {
      const { val } = items[k];
      push(k, val);
      return val;
    }
  }

  const keys = () => {
    return Reflect.ownKeys(items).reverse(); // if keys are strings or symbols

    const stack = [];
    if (head !== null) {
      stack.push(head);
      for (let i = 0; i < size - 1; i++) {
        stack.push(items[stack[i]].next);
      }
    }
    return stack;
  }

  return {
    push,
    remove,
    resize,
    get,
    keys,
    size: () => {
      return { current: size, max: capacity }
    }
  };
}

module.exports = function Cache(capacity, obj = {}) {
  const list = new List(capacity);

  for (k in obj) {
    list.push(k, obj[k]);
  }

  const bl = [ 'cache', 'size', 'capacity', 'delete' ];

  const proxy = new Proxy({}, {
    set: (target, property, value) => {
      if (property === 'capacity') {
        return list.resize(value);
      } else if (bl.indexOf(property) === -1) {
        list.push(property, value);
        return proxy;
      }
    },
    get: (target, property) => {
      switch(property) {
        case 'size':
          return list.size().current;
        case 'capacity':
          return list.size().max;
        case 'cache':
          return (k, v) => {
            list.push(k, v);
            return proxy;
          };
        case 'delete':
          return (k) => list.remove(k);
        default:
          return list.get(property);
      }
    },
    ownKeys: (target) => {
      console.log(list.keys());
      return list.keys();
    },
  });

  return proxy;
}
