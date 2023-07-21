// @ts-check

const test = `
; factorial using range
(: (f n) (* (..= 1 n)))

; using a simple loop
(: (f n)
    (= r "")
    (@ i 2 n
        (*= r i)))

; using recursion
(: (f n)
    (? (<= n 1)
        1
        (* n (f (- n 1)))))

(pr "5! = " (f 5))
`;

const test2 = `
(+ 1 2 3)
`;

function dau(input) {
	let r = parse(lex(input));
	console.dir(r, { depth: null });
	console.log(evaluate(r));
}

function lex(str) {
	const re = /;.*|".*?"|[()']|[^()'"\s]+/g;
	return str.match(re).filter((t) => !t.startsWith(';'));
}

function identify(t) {
	if (t.startsWith('"')) return { lit: t.slice(1, -1) };
	if (!isNaN(t)) return { lit: Number(t) };
	return { ref: t };
}

function parse(tok, tree = []) {
	while (tok.length > 0) {
		const t = tok.shift();
		if (t === ')') break;
		if (t === '(') {
			const branch = [parse(tok)];
			return parse(tok, tree.concat(branch));
		}
		tree.push(identify(t));
	}
	return tree;
}

const lib = {
	'+': (...xs) => xs.reduce((a, b) => a + b, 0),
	'*': (...xs) => xs.reduce((a, b) => a * b, 1),
	'%': (...xs) => xs.reduce((a, b) => a % b, Infinity),
	'-': (...xs) => (xs.length !== 1 ? xs.reduce((a, b) => a - b) : -xs[0]),
	'/': (...xs) => (xs.length !== 1 ? xs.reduce((a, b) => a / b) : 1 / xs[0]),
	'::': (...xs) => [...xs],
	'->': (x) => x,
	pr: (x) => (console.log(x), x),
};

function get(sym, env, i = env.length - 1) {
	if (sym in env[i]) return env[i][sym];
	return i > 0 ? get(sym, env, i - 1) : null;
}

function evaluate(node, env = [lib]) {
	if (Array.isArray(node)) {
		if (!node.length) return null;

		const list = node.map((x) => evaluate(x, env));
		if (list[0] instanceof Function) {
			const [fn, ...args] = list;
			return fn(...args);
		}
		return list[list.length - 1];
	}
	return node.ref ? get(node.ref, env) : node.lit;
}

dau(test2);
