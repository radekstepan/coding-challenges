# Soundex

In this Kata you will encode strings using a Soundex variation called **American Soundex** using the following steps:

1. Save the first letter. Remove all occurrences of 'h' and 'w' except first letter.
2. Replace all consonants (include the first letter) with digits.
  - b, f, p, v = 1
  - c, g, j, k, q, s, x, z = 2
  - d, t = 3
  - l = 4
  - m, n = 5
  - r = 6
3. Replace all adjacent same digits with one digit.
4. Remove all occurrences of a, e, i, o, u, y except first letter.
5. If first symbol is a digit replace it with letter saved on step 1.
6. Pad with zeroes if result contains less than 3 digits.

### Input

A space separated string of one or more names. E.g.

`Sarah Connor`

### Output

Space separated string of equivalent Soundex codes (the first character of each code must be uppercase). E.g.

`S600 C560`
