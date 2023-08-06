# notes

## on coding conventions

Function and variable names use **kebab-case**, as it's usual in Lisp-like languages (_dau_ is _not_ one of them, but has the same syntax).

```clojure
(= hello-world "Hello World!")
```

## concepts

- varargs
- structures
- coroutines

## opcodes

| name    | desc.                        |
| ------- | ---------------------------- |
| move    | copy value between registers |
| loadlit | load literal to register     |
| loadnil | load nil to register         |
| getval  | get value                    |
| gettab  | get value from table         |
| setval  | set value                    |
| settab  | set value to table           |
| newtab  | new table                    |
| jump    | add offset to instr. counter |
| eq      | equal                        |
| lt      | less than                    |
| le      | less than or equal           |
| call    | call a function              |
| tcall   | tail call                    |
| ret     | return from function call    |
