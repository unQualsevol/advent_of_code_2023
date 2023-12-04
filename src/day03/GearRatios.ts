import {Result, Solution} from "../types";


let totalHeight = 0;
let totalWidth = 0;

export const day03: Solution = (input: string): Result => {
	const lines = input.split(/\r?\n/);
	totalHeight = lines.length;
	totalWidth = lines[0].length;
	return {first: first(lines), second: second(lines)}
}

function first(lines: string[]) {
	let total = 0;
	let y = 0;
	for (const line of lines) {
		let x = 0;
		let currentNumber = "";
		let valid = false;
		for (const lineElement of line) {
			if (/\d/.test(lineElement)) {
				currentNumber += lineElement;
				valid = valid || isValid(lines, x, y, /[#*/\-@=+$&%]/).valid;
			} else {
				if (valid) {
					total += Number(currentNumber);
				}
				currentNumber = "";
				valid = false;
			}
			x++;
		}
		if (valid) {
			total += Number(currentNumber);
		}
		y++;
	}
	return total;
}

function isValid(lines: string[], x: number, y: number, regex: RegExp): {
	valid: boolean,
	position: { y: number, x: number }
} {
	const yStart = Math.max(0, y - 1);
	const yEnd = Math.min(totalHeight - 1, y + 1);
	const xStart = Math.max(0, x - 1);
	const xEnd = Math.min(totalWidth - 1, x + 1);
	for (let i = yStart; i <= yEnd; i++) {
		for (let j = xStart; j <= xEnd; j++) {
			if (i == y && j == x) continue;
			if (regex.test(lines[i].slice(j, j + 1))) {
				return {valid: true, position: {y: i, x: j}};
			}
		}
	}
	return {valid: false, position: {x: -1, y: -1}};
}

function second(lines: string[]) {
	const map = new Map<string, number[]>();
	let y = 0;
	for (const line of lines) {
		let x = 0;
		let currentNumber = "";
		let currentGear = {x: -1, y: -1}
		let valid = false;
		for (const lineElement of line) {
			if (/\d/.test(lineElement)) {
				currentNumber += lineElement;
				if (!valid) {
					const result = isValid(lines, x, y, /\*/);
					currentGear = result.position;
					valid = result.valid;
				}
			} else {
				if (valid) {
					const key = `${currentGear.y}_${currentGear.x}`;
					if (!map.has(key)) {
						map.set(key, []);
					}
					map.get(key)!.push(Number(currentNumber));
				}
				currentNumber = "";
				valid = false;
			}
			x++;
		}
		if (valid) {
			const key = `${currentGear.y}_${currentGear.x}`;
			if (!map.has(key)) {
				map.set(key, []);
			}
			map.get(key)!.push(Number(currentNumber));
		}
		y++;
	}
	let total = 0
	for (const values of map.values()) {
		if (values.length === 2) {
			total += values[0] * values[1];
		}
	}
	return total;
}