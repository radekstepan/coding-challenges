This problem was asked by Quora.

Given an absolute pathname that may have . or .. as part of it, return the shortest standardized path.

For example, given "/usr/bin/../bin/./scripts/../", return "/usr/bin/".

```js
const tests = [
  ["/usr/bin/../bin/./scripts/../", "/usr/bin"],
  ["/home/", "/home"],
  ["/a/./b/../../c/", "/c"],
  ["/a/..", "/"],
  ["/a/../", "/"],
  ["/../../../../../a", "/a"],
  ["/a/./b/./c/./d/", "/a/b/c/d"],
  ["/a/../.././../../.", "/"],
  ["/a//b//c//////d", "/a/b/c/d"]
];

const simplify = path =>
  "/" +
  path
    .replace(/[^.]\.\//g, "/")
    .split("/")
    .reduce((path, seg) => {
      if (!seg.length) return path;
      if (seg === ".") {
        return path;
      }
      if (seg === "..") {
        return path.slice(0, -1);
      }
      return [...path, seg];
    }, [])
    .join("/");

tests.forEach(([path, expected]) => {
  const actual = simplify(path);
  if (actual !== expected) {
    throw new Error(`Expected ${expected} got ${actual}`);
  }
});

console.log("OK");
```