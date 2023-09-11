let t = `
; test
(: x (+ 1 2 3))
(pr x)
`;

console.log(_parse(t));

function _parse(s) {
	const re = /;.*|"(?:\\.|[^"])*"|[^"();\s]+|\S/g;
	let t;

	const atom = (x) => (!isNaN(x) ? +x : Symbol(x));
	const ls = (e = []) => {
		while ((t = re.exec(s))) {
			if (t[0].startsWith(';')) continue;
			if (t[0] == ')') break;
			if (t[0] == '(') return ls(e.concat([ls()]));
			e.push(atom(t[0]));
		}
		return e;
	};

	return ls();
}

/////////

let b = [
	['st', 0, 5],
	['st', 1, 1],
	['st', 2, 1],
	['jl', 2, 0, 4],
	['*', 1, 1, 2],
	['++', 2],
	['jp', -3],
	['pr', 1],
	['ht'],
];

vm(b);

function vm(code) {
	const os = [];
	const vr = [];

	let i = 0;
	let on = true;

	while (on) {
		switch (code[i][0]) {
			case 'ht':
				on = false;
				break;
			case 'st':
				vr[code[i][1]] = code[i][2];
				break;
			case '++':
				vr[code[i][1]]++;
				break;
			case 'jl':
				if (!(vr[code[i][1]] <= vr[code[i][2]])) i += code[i][3] - 1;
				break;
			case 'jp':
				i += code[i][1] - 1;
				break;
			case '*':
				vr[code[i][1]] = vr[code[i][2]] * vr[code[i][3]];
				break;
			case 'pr':
				console.log(vr[code[i][1]]);
				break;
		}

		i++;
	}
}
