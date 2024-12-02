import {Result, Solution} from "../types";

function forward(matrix: number[][]) {
	let value = 0
	for (let i = matrix.length - 1; i >= 0; i--) {
		matrix[i].push(value);
		if (i - 1 >= 0) {
			value += matrix[i - 1].slice(-1)[0];
		}
	}
}

function backward(matrix: number[][]) {
	let value = 0
	for (let i = matrix.length - 1; i >= 0; i--) {
		matrix[i] = [value, ...matrix[i]];
		if (i - 1 >= 0) {
			value = matrix[i - 1].slice(0)[0] - value;
		}
	}
}

function getMatrix(history: number[]) {
	const matrix: number[][] = [history];
	let currentLevel = history;

	while (currentLevel.length > 1 && currentLevel.some((value) => value !== 0)) {
		currentLevel = currentLevel.reduce((acc, current, currentIndex) => {
			if (currentIndex === currentLevel.length - 1) return acc;
			acc.push(currentLevel[currentIndex + 1] - current);
			return acc;
		}, [] as number[]);
		matrix.push(currentLevel)
	}
	return matrix;
}

function first(histories: number[][]) {
	return histories.reduce((acc, history) => {
		const matrix = getMatrix(history);
		forward(matrix);
		return acc + matrix[0].slice(-1)[0];
	}, 0);
}

function second(histories: number[][]) {
	return histories.reduce((acc, history) => {
		const matrix = getMatrix(history);
		backward(matrix);
		matrix.forEach(line => console.log(line))
		console.log("\n")
		return acc + matrix[0].slice(0)[0];
	}, 0);
}

export const day09: Solution = (input: string): Result => {
	const histories = input.split(/\r?\n/).map((line) =>
		line.split(" ").map((element) => Number(element))
	);
	return {first: first(histories), second: second(histories)};
}