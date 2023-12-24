// In a particular board game, a player has to try to advance through a sequence of
// positions. Each position has a nonnegative integer associated with it, representing
// the maximum you can advance from that position in one move. You begin at the first
// position, and win by getting to the last position.
// For example, let A = (3,3,1,0,2,0,1) represent the board game, i.e., the ith entry
// in A is the maximum we can advance from i. Then the game can be won by the following
// sequence of advances through A:
// 1. take 1 step from A[0] to A[1],
// 2. then 3 steps from A[1] to A[4],
// 3. then 2 steps from A[4]to A[6], which is the last position.
// Note that A[0] = 3 >= 1, A[1] = 3 >= 3, and A[4] = 2 >= 2, so all moves are valid.
// If A instead was (3,2,0,0,2,0,1), it would not possible to advance past position 3,
// so the game cannot be won.
// Write a program which takes an array of n integers, where A[i] denotes the maximum
// you can advance from index i, and returns whether it is possible to advance to the
// last index starting from the beginning of the array.

function can_reach_end_recursive(A: number[]) {
  const [head, ...tail] = A;
  if (!tail.length) {
    return true;
  }
  let i = 1;
  while (i <= head) {
    if (can_reach_end_recursive(tail.slice(i - 1))) {
      return true;
    }
    i++;
  }
  return false;
}

function can_reach_end(A: number[]): boolean {
  // Track the furthest position that can be reached from the start.
  let maxReach = 0;
  let i = 0;
  // Walk through each position.
  while (i < A.length) {
    // If our position is greater than we can reach to, we have a gap
    //  and can't get to the end.
    if (i > maxReach) return false;
    // If we don't have a gap, update the furthest we can reach from us.
    maxReach = Math.max(maxReach, i + A[i]);
    // If the maximum reachable index is at or beyond the last index, return true.
    if (maxReach >= A.length - 1) return true;
    i++;
  }
  return false;
}

console.log(can_reach_end([0, 1]));
console.log(can_reach_end([2,2,1]));
console.log(can_reach_end([3,3,1,0,2,0,1]));
console.log(can_reach_end([3,2,0,0,2,0,1]));
console.log(can_reach_end([2,4,1,1,0,2,3]));

// Write a program to compute the minimum number of steps needed to
// advance to the last location.

function min_can_reach_end(A: number[]): number {
  let steps = 0;
  let currentEnd = 0;
  let maxReach = 0;
  let i = 0;
  while (i < A.length - 1) {
    // Update the furthest we can reach from here
    maxReach = Math.max(maxReach, i + A[i]);

    // If we have reached the end of our current step's reach
    if (i === currentEnd) {
      // We need to take another step
      steps++;
      
      // If the maxReach is not beyond the current position,
      // we cannot move forward and hence cannot reach the end
      if (maxReach <= i) return -1;
      
      // Update the current end to the furthest reach
      currentEnd = maxReach;
      
      // If the current reach is beyond the last position, we are done
      if (currentEnd >= A.length - 1) break;
    }
    i++;
  }

  return steps;
}

console.log(min_can_reach_end([0, 1]));
console.log(min_can_reach_end([2,2,1]));
console.log(min_can_reach_end([3,3,1,0,2,0,1]));
console.log(min_can_reach_end([3,2,0,0,2,0,1]));
console.log(min_can_reach_end([2,4,1,1,0,2,3]));
