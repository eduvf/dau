// @ts-check

const test0 = `
; 100 doors

"hi""ho""tes\\"t"
10 10.10 10.e 0x123ff 0b01102
😂😃(🧘🏻‍♂️ 🌍 🌦️) 🥖.🚗
fàstic

(open = ('))
(@ 'i 1 100
    (@ 'j i 100 i
        (open.j = !open.j)))

(@ 'i 'v open
    (>> "door " & i & " is " &
        (? v "open" "close")))
`;

const test1 = `
(: (f n) (* 1..=n)

(: (f n)
    (= r "")
    (@ (' i 2 n)
        (*= r i)))

(: (f n)
    (? n <= 1
        1
        n * (f n-1)))

(pr (f 5))
`;

const text2 = `
grad = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '$', '@']
@ y, -1, 1, 0.05
	line = ''
	@ x, -1.5, 1.5, 0.025
		a = x
		b = y
		i = 0
		@ i < 100
			t = a
			a = a * a - b * b - 0.79
			b = t * b * 2 + 0.15
			? (a * a + b * b) > 4
				/>
			,	i += 1
		line &= grad[flr i/10]
	pr line
`;

/*
let map = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "$", "@"];
for (let y = -1; y < 1; y += 0.05) {
	let line = '';
	for (let x = -1.5; x < 1.5; x += 0.025) {
		let [zr, zi, i] = [x, y, 0];
		while (i < 100) {
			let old_zr = zr;
			zr = zr * zr - zi * zi - 0.79;
			zi = old_zr * zi * 2 + 0.15;
			if (zr * zr + zi * zi > 4) break;
			else i++;
		}
		line += map[Math.floor(i / 10)];
	}
	console.log(line);
}
//*/

const test3 = `
(: (f n)
    (? n <= 1
        1
        n * (f n - 1)))

(pr "5! = " (f 5))
`;

dau(test3);

//--------------------------------------------------------------

function dau(input, env) {
	console.log(Array.from(lex(input)));
}

function error(msg, i) {
	console.error('⚠️  ' + msg + (i ? ' at index ' + i : ''));
	return null;
}

function* lex(s) {
	const re = /;.*|"(?:\\.|[^"])*"?|[^({[\]})'\s]+|\S/g;

	const str_error = () => error('Unterminated string literal');
	const num_error = (t, i) => error(`Invalid number '${t}'`, i);

	for (let token of s.matchAll(re)) {
		const t = token[0];
		const i = token.index;

		// comment
		if (t[0] === ';') continue;
		// bracket
		if ('([{}])'.includes(t)) yield [t];
		// string
		else if (t[0] === '"')
			yield t.slice(-1) !== '"' ? str_error() : ['s', i, t];
		// number
		else if (/^-?\d/.test(t))
			yield isNaN(t) ? num_error(t, i) : ['n', i, Number(t)];
		// identifier
		else yield ['i', i, t];
	}
}
