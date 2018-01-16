# Nested Integer

## Part 1 - Depth

Given a nested list of integers, returns the sum of all integers in the list weighted by their depth.

For example, given the list `{{1,1},2,{1,1}}` the function should return `10` (4x1 at depth 2, 1x2 at depth 1).

Given the list `{1,{4,{6}}}` the function should return `27` (1x1 at depth 1, 1x4 at depth 2, and 1x6 at depth 3).

## Part 2 - Reverse Depth

Return the sum of all integers in the list weighted by their "reversed depth".

For example, given the list `{{1,1},2,{1,1}}` the function should return `8`.
