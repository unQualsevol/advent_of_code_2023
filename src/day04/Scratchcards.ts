import {Result, Solution} from "../types";

interface Scratchcard {
	id: number;
	winningNumbers: number[];
	haveNumbers: number[];
}

export const day04: Solution = (input: string): Result => {
	const lines = input.split(/\r?\n/);
	const scratchCards = lines.map(parse);
	return {first: first(scratchCards), second: second(scratchCards)}
}

function parse(line: string): Scratchcard {
	const [cardNumberString, winningNumbersString, haveNumbersString] = line.split(/[:|]/);
	const id = Number(cardNumberString.slice(cardNumberString.length - 3, cardNumberString.length).trim())-1;
	const winningNumbers = cleanUp(winningNumbersString.trim());
	const haveNumbers = cleanUp(haveNumbersString.trim());
	return {id, winningNumbers, haveNumbers};
}

function first(scratchcards: Scratchcard[]) {
	return scratchcards.reduce((acc, scratchcard) => {
		return acc + calculatePoints(scratchcard);
	}, 0);
}

function cleanUp(listOfNumbersAsString: string): number[] {
	return listOfNumbersAsString.replace(/\s\s/g, " ").split(" ").map((value) => Number(value));
}

function calculatePoints(scratchCard: Scratchcard) {
	return scratchCard.haveNumbers.reduce((acc, current) => {
			if (scratchCard.winningNumbers.includes(current)) {
				acc += !acc ? 1 : acc;
			}
			return acc;
		}
		, 0);
}

function second(scratchcards: Scratchcard[]): number {
	const map = new Map<number, number>();
	for (let i = 0; i < scratchcards.length; i++) {
		map.set(i, 1);
	}
	for (let i = 0; i < scratchcards.length; i++) {
		const current = scratchcards[i];
		console.log(current);
		const numberOfMatches = calculateMatches(current);
		for (let j = i + 1; j <= i + numberOfMatches; j++) {
			map.set(j, map.get(j)! + map.get(i)!);
		}
	}
	let total = 0;
	for (const value of map.values()) {
		total += value;
	}
	return total;
}

function calculateMatches(scratchcard: Scratchcard): number {
	return scratchcard.haveNumbers.reduce((acc, current) => acc + (scratchcard.winningNumbers.includes(current) ? 1 : 0), 0);
}
