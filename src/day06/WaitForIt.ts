import {Result, Solution} from "../types";

interface Race {
	time: number;
	distance: number;
}

export const day06: Solution = (input: string): Result => {
	return {first: first(input), second: second(input)};
}

function first(input: string): number {
	const races: Race[] = parse(input);
	return races.reduce((acc, current) => {
		const winningOptions = calculateWinningOptions(current);
		return acc * winningOptions;
	}, 1);
}

function parse(input: string) : Race[] {
	const [timeLine, distanceLine] = input.split(/\r?\n/);
	const times = getNumbers(timeLine);
	const distances = getNumbers(distanceLine);
	return times.map((time, index) => ({time, distance: distances[index]}));
}

function getNumbers(line: string) {
	const [_, ...numbers] = line.split(/\s+/);
	return numbers.map((value) => Number(value)) ?? [];
}

function calculateWinningOptions(current: Race) : number {
	let winningOptionsCount = 0;
	for (let i = 0; i <= current.time; i++) {
		if(i*(current.time-i) > current.distance) {
			winningOptionsCount++;
		}
	}
	return winningOptionsCount;
}

function second(input: string): number {
	const [time, distance] = input
		.split(/\r?\n/)
		.map((line) => Number(line.replace(/\s+/g, "").split(":")[1]));
	console.log(time, distance)
	return calculateWinningOptions({time, distance});
}