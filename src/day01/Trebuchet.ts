import {Result, Solution} from "../types";

export const day01: Solution = (input: string): Result => {
	return input.split(/\r?\n/).reduce((acc, line) => {
		return {
			first: acc.first + numbersOnlyCalibrationValue(line),
			second: acc.second + numbersAndStringsCalibrationValue(line),
		};
	}, {first: 0, second: 0});
}

function getFirstNumber(line: string): string {
	return /(\d)/.exec(line)?.[1]!;
}

function getFirstNumberOrStringNumber(line: string): string {
	return toNumber(/(\d|one|two|three|four|five|six|seven|eight|nine)/.exec(line)?.[1]!);
}

const numberRepresentation = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const numberMap: { [z: string]: string } = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};

function getLastNumberOrStringNumber(line: string): string {
	return numberRepresentation
		.map((value) => ({index: line.lastIndexOf(value), value: toNumber(value)}))
		.reduce((acc, current) => {
			if (current.index > acc.index) {
				return current;
			}
			return acc;
		}, {index: -1, value: "0"}).value;
}

function toNumber(stringNumber: string): string {
	return numberMap[stringNumber] ?? stringNumber;
}

function getLastNumber(line: string): string {
	return /.*(\d)[a-z]*$/.exec(line)?.[1]!;
}

function numbersOnlyCalibrationValue(line: string): number {
	return Number(getFirstNumber(line) + getLastNumber(line));
}

function numbersAndStringsCalibrationValue(line: string): number {
	return Number(getFirstNumberOrStringNumber(line) + getLastNumberOrStringNumber(line));
}