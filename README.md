# 🎲 dau

**dau** (pronounced _dah-oo_) is an experimental programming language designed as a learning exercise.

## example

```haskell
-- this is a comment
pr "hello, world!"

: countdown(n), n > 0
  @ i = n, 0, -1
    ? i > 0
      pr i
    | pr "GO!"
    .
  .
.

countdown 3
```
