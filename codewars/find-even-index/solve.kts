fun findEvenIndex(arr:IntArray):Int {
  var l = arr.sum()
  var r = 0

  for (i in arr.size - 1 downTo 0) {
    l -= arr[i]
    if (l == r) return i
    r += arr[i]
  }

  return -1
}

assert(3 == findEvenIndex(intArrayOf(1, 2, 3, 4, 3, 2, 1)))
assert(1 == findEvenIndex(intArrayOf(1, 100, 50, -51, 1, 1)))
assert(-1 == findEvenIndex(intArrayOf(1, 2, 3, 4, 5, 6)))
assert(3 == findEvenIndex(intArrayOf(20, 10, 30, 10, 10, 15, 35)))
assert(-1 == findEvenIndex(intArrayOf(-8505, -5130, 1926, -9026)))
assert(1 == findEvenIndex(intArrayOf(2824, 1774, -1490, -9084, -9696, 23094)))
assert(6 == findEvenIndex(intArrayOf(4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4)))