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

dau(test0);

//--------------------------------------------------------------

function dau(input, env) {
	console.log(Array.from(lex(input)));
}

function warn(msg, i) {
	console.warn('⚠️  ' + msg + (i ? ' at index ' + i : ''));
	return null;
}

function* lex(s) {
	// patterns
	const se = (c) => '([{}]),'.includes(c);
	const op = (c) => "!#$%&'*+-./:<=>?@\\^_`|~".includes(c);
	const id = (c) => !(/\s/.test(c) || se(c) || op(c));

	let i = -1;
	let c;

	// advance while matching the pattern
	let scan = (pattern, skip = false) => {
		const start = i;
		while ((c = s[++i]) && pattern(c));
		return s.slice(start, skip ? i : i--);
	};
	// scan string until the next unescapated quote
	const str_pat = (x) => !(s[i - 1] !== '\\' && x === '"');
	// scan number while alphanumeric or a dot followed by a digit
	const num_pat = (x) => /\w/.test(x) || (x === '.' && /\d/.test(s[i + 1]));

	while ((c = s[++i])) {
		// ignore whitespace
		if (/\s/.test(c)) continue;

		// comment
		if (c === ';') while ((s[++i] ?? '\n') !== '\n');
		// separator
		else if (se(c)) yield [c];
		// operator
		else if (op(c)) yield ['o', scan(op)];
		// string
		else if (c === '"') {
			let str = scan(str_pat, true);
			if (s[i] !== '"') warn(`Unclosed string literal: ${str}`);
			yield ['s', str];
		}
		// number
		else if (/\d/.test(c)) {
			let num = scan(num_pat);
			if (isNaN(num)) warn(`Invalid number '${num}'`, i);
			yield ['n', Number(num)];
		}
		// identifier
		else yield ['i', scan(id)];
	}
}
