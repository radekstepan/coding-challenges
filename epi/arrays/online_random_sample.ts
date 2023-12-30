// Design a program that takes as input a size k, and reads packets, continuously maintaining a
// uniform random subset of size k of the read packets.

// Apparently this is called "reservoir sampling algorithm".
function online_random_sample<T>(size: number): [T[], (packet: T) => void] {
  const sample: T[] = [];
  // Total size seen so far.
  let i = 0;
  function write(packet: T): void {
    i++;
    // Fill up the sample.
    if (sample.length < size) {
      sample.push(packet);
    } else {
      // Then choose if we are going to swap a new packet in based
      //  on the proportion between sample size / size seen so far.
      if (Math.random() < size / i) {
        const j = Math.floor(Math.random() * size);
        sample[j] = packet;
      }

      // EPI solution:
      // const k = Math.floor(Math.random() * i);
      // if (k < size) {
      //   sample[k] = packet;
      // }
    }
  };

  return [sample, write];
}

const A = [1, 2, 3, 4];
const size = 2;

// const [sample, write] = online_random_sample(size);
// A.forEach(packet => write(packet));
// console.log(sample);

const S = 10000;
let c = 0;
for (let i = 0; i < S; i++) {
  const [sample, write] = online_random_sample(size);
  A.forEach(packet => write(packet));
  if (sample.includes(A[0])) {
    c++;
  };
}
console.log(100 / A.length * size, 100 * c / S);
