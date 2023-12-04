import {Result, Solution} from "../types";

interface Game {
	red: number;
	green: number;
	blue: number;
}

interface CubeQuantity {
	quantity: number;
	color: keyof Game;
}

export const day02: Solution = (input: string): Result => {
	const gameLimits: Game = {red: 12, green: 13, blue: 14};
	return input.split(/\r?\n/).reduce((acc, line) => {
		return {
			first: acc.first + gameIdIfValid(line, gameLimits),
			second: acc.second + calculateFewerCubes(line),
		};
	}, {first: 0, second: 0});
}

function gameIdIfValid(line: string, gameLimits: Game) {
	const {gameNumber, cubes} = parse(line);
	return validateAllAgainstLimits(cubes, gameLimits) ? Number(gameNumber) : 0;
}

function parse(line: string): {gameNumber: number, cubes: CubeQuantity[]} {
	const [gameIdentifier, games] = line.split(": ");
	const [_, gameNumber] = gameIdentifier.split(" ");
	const values: CubeQuantity[] = games.split(/[;,]\s/).map((value) => {
		const [quantity, color] = value.split(" ");
		return {quantity: Number(quantity), color: color as keyof Game};
	});
	return {gameNumber: Number(gameNumber), cubes: values};
}

function validateAllAgainstLimits(values: CubeQuantity[], gameLimits: Game): boolean {
	return values.every((value) => validateAgainstLimits(value, gameLimits));
}

function validateAgainstLimits(value: CubeQuantity, gameLimits: Game) {
	return value.quantity <= gameLimits[value.color];
}

function calculateFewerCubes(line: string) {
	const { cubes} = parse(line);
	const fewerCubesNeeded = cubes.reduce((acc, current) => {
		if(acc[current.color] < current.quantity) {
			acc[current.color] = current.quantity;
		}
		return acc;
	}, {red: 0, green: 0, blue: 0} as Game);
	return fewerCubesNeeded.red * fewerCubesNeeded.green * fewerCubesNeeded.blue;
}