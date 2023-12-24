// Design a deterministic scheme by which reads and writes to
// an uninitialized array can be made in O(1) time. You may use
// O(n) additional storage; reads to uninitialized entry should
// return false.

class FastArray<T> {
  map = new Map<number, T>;

  read(i: number): T | false  {   
    if (i < 0) {
      return false;
    }

    if (!this.map.has(i)) {
      return false;
    }

    return this.map.get(i);
  }

  write(i: number, value: T): void {
    this.map.set(i, value);
  }
}

const fa = new FastArray<string>();
fa.write(0, 'a');
fa.write(2, 'c');
console.log(fa.read(0));
console.log(fa.read(1));
console.log(fa.read(2));
console.log(fa.read(3));
