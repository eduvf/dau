---
layout: default
permalink: /
title: dau - home
---

# 🎲 dau

```clojure
(: (f n)
    (? (<= n 1)
        1
        (* n (f (- n 1)))))

(pr "5! = " (f 5))
```
