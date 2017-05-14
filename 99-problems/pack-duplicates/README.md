# [Pack consecutive duplicates of list elements into sublists](https://sites.google.com/site/prologsite/prolog-problems/1)

If a list contains repeated elements they should be placed in separate sublists.

Example:

```prolog
?- pack([a,a,a,a,b,c,c,a,a,d,e,e,e,e],X).
X = [[a,a,a,a],[b],[c,c],[a,a],[d],[e,e,e,e]]
```
