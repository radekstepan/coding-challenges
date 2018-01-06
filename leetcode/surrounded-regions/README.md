# [Surrounded Regions](https://leetcode.com/problems/surrounded-regions/description/)

Given a 2D board containing `X` and `O`, capture all regions surrounded by `X`.
A region is captured by flipping all `O`s into `X`s in that surrounded region.

For example,

```
X X X X
X O O X
X X O X
X O X X
```

After running your function, the board should be:

```
X X X X
X X X X
X X X X
X O X X
```

## TODO

- Number of layers is different for each side if board is uneven.
- But keep track starred for last layer, at least one side (top/bottom or left/right) needs to be starred, even if it's been skipped because it's uneven
- Do odd boards work (height/width-wise)?
- Need to set max layers (half of width/height) for each side, not just one global.
