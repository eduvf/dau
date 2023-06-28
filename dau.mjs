let t = `
  -- comment
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
  `;

/**
 * Evaluates a string of 'dau' code
 * @param {String} input
 * @param {Array.<Object>} env
 */
function dau(input, env = [{}]) {
	let r = lex(input);

	console.log(r);
}

dau(t);

//--------------------------------------------------------------

/**
 * LEXER
 * Splits a string into tokens
 *
 * @param {String} s
 */
function lex(s) {
	// Define the token patterns
	const pat = [
		// comment (-- to be ignored)
		/--.*/,
		// string ("hello, world!")
		/"(?:\\.|[^"])*"?/,
		// number (0xFF .5 1.2e10)
		/\d*\.?\d[\w-]*/,
		// separator
		/[({[\]})',;\n]/,
		// operator
		/[-+*/%!&|<=>.:?@#]+/,
		// identifier
		/(?:\w|[^!-~\s])+/,
	];

	// Create a big regular expression
	const re = new RegExp(pat.map((ex) => ex.source).join('|'), 'g');

	// Lines for debugging
	let line = 1;

	const identifyToken = (t) => {
		// new line
		if (t === '\n') return { t: 'l', v: line++ };
		// string
		if (t[0] === '"') return checkString(t);
		// number
		if (/^\.?\d/.test(t)) return checkNumber(t);
		// separator
		if ("({[]})',;".includes(t)) return { t: t, v: null };
		// boolean
		if ((t === 'ok') | (t === 'no')) return { t: 'b', v: t === 'ok' };
		// operator
		if ('-+*/%!&|<=>.:?@#'.includes(t[0])) return { t: 'o', v: t };
		// identifier
		return { t: 'i', v: t };
	};

	const checkString = (t) => {
		// Strings should have length 2 at minimum (the empty string: "")
		if (t.length < 2 || t.charAt(-1) !== '"') throw `[⚠️] Unclosed string starting at line ${line}.`;
		return { t: 's', v: t.slice(1, -1) };
	};

	const checkNumber = (t) => {
		const n = Number(t);
		// Throw an error if the number cannot be parsed
		if (isNaN(n)) throw `[⚠️] Failed to parse "${t}" as a number at line ${line}.`;
		return { t: 'n', v: n };
	};

	// Match with RegEx, filter out comments and identify each token
	return s
		.match(re)
		.filter((t) => t.slice(0, 2) !== '--')
		.map(identifyToken);
}
