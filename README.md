# 🎲 dau

**dau** (pronounced _DAH-oo_) is a simple programming language designed as a learning exercise.

## resources

- [The Implementation of Lua 5.0](https://www.lua.org/doc/jucs05.pdf)
- [A No-Frills Introduction to Lua 5.1 VM Instructions](http://underpop.free.fr/l/lua/docs/a-no-frills-introduction-to-lua-5.1-vm-instructions.pdf)
- [A Surprisingly Simple Lua Compiler](https://www.inf.puc-rio.br/~roberto/docs/paper-aot-preprint.pdf)

## example

```clojure
(: (f n)
    (? (<= n 1)
        1
        (* n (f (dec n)))))

(pr (f 5))
```
