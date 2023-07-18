/*
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
*/
