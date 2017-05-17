# Soundex

In this Kata you will encode strings using a Soundex variation called "American Soundex" using the following steps:

- Save the first letter. Remove all occurrences of h and w except first letter.
- Replace all consonants (include the first letter) with digits as follows:
  - b, f, p, v = 1
  - c, g, j, k, q, s, x, z = 2
  - d, t = 3
  - l = 4
  - m, n = 5
  - r = 6
- Replace all adjacent same digits with one digit.
- Remove all occurrences of a, e, i, o, u, y except first letter.
- If first symbol is a digit replace it with letter saved on step 1.
- Append 3 zeros if result contains less than 3 digits. Remove all except first letter and 3 digits after it.

### Input

A space separated string of one or more names. E.g.

`Sarah Connor`

zxqurlwbx
Z22-64*12
Z641

### Output

Space separated string of equivalent Soundex codes (the first character of each code must be uppercase). E.g.

`S600 C560`
