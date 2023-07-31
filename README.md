# 🎲 dau

**dau** (pronounced _DAH-oo_) is a simple programming language designed as a learning exercise.

## example

```clojure
(: (f n)
    (? (<= n 1)
        1
        (* n (f (dec n)))))

(pr (f 5))
```
