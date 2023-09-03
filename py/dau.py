#!/bin/python

import re

class Symbol(str):
    pass

def lex(s):
    r = r'(;.*|"(?:\\.|[^"])*"?|[^({[\]});"\s]+|\S)'
    t = re.findall(r, s)
    return list(filter(lambda x: not x.startswith(';'), t))

def parse(tok):
    if len(tok) == 0:
        raise SyntaxError()
    t = tok.pop(0)
    if t == '(':
        l = []
        while tok[0] != ')':
            l.append(parse(tok))
        tok.pop(0)
        return l
    if t == ')':
        raise SyntaxError()
    return atom(t)

def atom(t: str):
    if t[0]=='"':
        return t[1:-1].encode('utf-8').decode('unicode-escape')
    try:
        return float(t)
    except ValueError:
        return Symbol(t)

class Env(dict):
    def __init__(self, parms=(), args=(), outer=None):
        self.update(zip(parms, args))
        self.outer=outer
    def find(self, sym):
        return self if (sym in self) else self.outer.find(sym)

class Proc(object):
    def __init__(self, parms, exp, env):
        self.parms, self.exp, self.env = parms, exp, env
    def __call__(self, *args):
        return eval(self.exp, Env(self.parms, args, self.env))

def standard_env():
    import math
    import operator as op

    env = Env()
    env.update(vars(math)) # sin, cos, sqrt, pi, ...
    env.update({
        '+':op.add, '-':op.sub, '*':op.mul, '/':op.truediv, 
        '>':op.gt, '<':op.lt, '>=':op.ge, '<=':op.le, '=':op.eq, 
        'abs':     abs,
        'append':  op.add,  
        'apply':   lambda proc, args: proc(*args),
        'begin':   lambda *x: x[-1],
        'car':     lambda x: x[0],
        'cdr':     lambda x: x[1:], 
        'cons':    lambda x,y: [x] + y,
        'eq?':     op.is_, 
        'expt':    pow,
        'equal?':  op.eq, 
        'length':  len, 
        'list':    lambda *x: List(x), 
        'list?':   lambda x: isinstance(x, List), 
        'map':     map,
        'max':     max,
        'min':     min,
        'not':     op.not_,
        'null?':   lambda x: x == [], 
        'number?': lambda x: isinstance(x, Number),  
		'print':   print,
        'procedure?': callable,
        'round':   round,
        'symbol?': lambda x: isinstance(x, Symbol),
    })
    return env

global_env = standard_env()

def eval(x, env=global_env):
    "Evaluate an expression in an environment."
    while True:
        if isinstance(x, Symbol):       # variable reference
            return env.find(x)[x]
        elif not isinstance(x, list):   # constant literal
            return x                
        elif x[0] == Symbol('quote'):     # (quote exp)
            (_, exp) = x
            return exp
        elif x[0] == Symbol('if'):        # (if test conseq alt)
            (_, test, conseq, alt) = x
            x = (conseq if eval(test, env) else alt)
        elif x[0] == Symbol('set'):       # (set! var exp)
            (_, var, exp) = x
            env.find(var)[var] = eval(exp, env)
            return None
        elif x[0] == Symbol('define'):    # (define var exp)
            (_, var, exp) = x
            env[var] = eval(exp, env)
            return None
        elif x[0] == Symbol('lambda'):    # (lambda (var*) exp)
            (_, vars, exp) = x
            return Proc(vars, exp, env)
        elif x[0] == Symbol('begin'):     # (begin exp+)
            for exp in x[1:-1]:
                eval(exp, env)
            x = x[-1]
        else:                    # (proc exp*)
            exps = [eval(exp, env) for exp in x]
            proc = exps.pop(0)
            if isinstance(proc, Proc):
                x = proc.exp
                env = Env(proc.parms, exps, proc.env)
            else:
                return proc(*exps)


def dau(s):
    # print(eval(parse(lex(s))))
    print(eval(parse(lex(s))))

##############

t="""
;test
(begin

(define circle-area (lambda (r) (* pi (* r r))))
(print (circle-area 3))

(define twice (lambda (x) (* 2 x)))
(define repeat (lambda (f) (lambda (x) (f (f x)))))
(print ((repeat twice) 10))

(define sum2 (lambda (n acc)
  (if (= n 0)
      acc
      (sum2 (- n 1) (+ n acc)))))
(print (sum2 1000000 0))

)
"""

dau(t)