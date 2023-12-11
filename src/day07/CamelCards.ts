import {Result, Solution} from "../types";

const mapping: { [x: string]: string } = {
	"2": "b",
	"3": "c",
	"4": "d",
	"5": "e",
	"6": "f",
	"7": "g",
	"8": "h",
	"9": "i",
	"T": "j",
	"J": "k",
	"Q": "l",
	"K": "m",
	"A": "n",
}

export const day07: Solution = (input: string): Result => {
	return {first: first(input), second: second(input)};
}

function first(input: string): number {
	return input.split(/\r?\n/)
		.map((line) => {
			const [hand, bid] = line.split(" ");
			return {hand, bid: Number(bid), sortValue: calculateSortValue(hand, typeOfHand)};
		}).sort((a, b) => {
			if (a.sortValue < b.sortValue) return -1;
			if (a.sortValue > b.sortValue) return 1;
			return 0;
		}).reduce((acc, current, currentIndex) => {
			return (currentIndex + 1) * current.bid + acc;
		}, 0);

}

function second(input: string): number {
	mapping["J"] = "a"
	return input.split(/\r?\n/)
		.map((line) => {
			const [hand, bid] = line.split(" ");
			return {hand, bid: Number(bid), sortValue: calculateSortValue(hand, typeOfHandWithJoker)};
		}).sort((a, b) => {
			if (a.sortValue < b.sortValue) return -1;
			if (a.sortValue > b.sortValue) return 1;
			return 0;
		}).reduce((acc, current, currentIndex) => {
			return (currentIndex + 1) * current.bid + acc;
		}, 0);

}

function calculateSortValue(hand: string, handTypeFn: (x: string) => number) {
	return handTypeFn(hand) + hand.split("").map((card) => mapping[card]).join("");
}

function typeOfHand(hand: string): number {
	const handMap = hand.split("").reduce((acc, current) => {
		acc[current] = acc[current] ? acc[current] + 1 : 1;
		return acc;
	}, {} as { [x: string]: number });
	const handMapValues = Object.values(handMap);
	if (handMapValues.includes(5)) return 7;
	if (handMapValues.includes(4)) return 6;
	if (handMapValues.includes(3) && handMapValues.includes(2)) return 5;
	if (handMapValues.includes(3)) return 4;
	return handMapValues.filter((value) => value === 2).length + 1;
}

function typeOfHandWithJoker(hand: string): number {
	const handMap = hand.split("").reduce((acc, current) => {
		acc[current] = acc[current] ? acc[current] + 1 : 1;
		return acc;
	}, {} as { [x: string]: number });
	const handMapEntries = Object.entries(handMap);
	const handMapValues = handMapEntries.map((entry) => entry[1]);
	if (handMapValues.includes(5)) return 7;
	if (handMapValues.includes(4)) {
		return handMap["J"] ? 7 : 6;
	}
	if (handMapValues.includes(3) && handMapValues.includes(2)) {
		return handMap["J"] ? 7 : 5;
	}
	if (handMapValues.includes(3)) {
		return handMap["J"] ? 6 : 4;
	}
	const pairs = handMapEntries.filter((entry) => entry[1] === 2);
	const single = handMapEntries.filter((entry) => entry[1] === 1);
	if (pairs.length === 2) {
		if (single[0][0] === "J") return 5;
		if (containsJoker(pairs)) return 6;
		return 3;
	}
	if (pairs.length === 1) {
		if (pairs[0][0] === "J") return 4;
		if (containsJoker(single)) return 4;
		return 2;
	}
	if (pairs.length === 0) {
		if (containsJoker(single)) return 2;
	}
	return 1;
}

function containsJoker(entries: [x: string, y: number][]): boolean {
	return !!entries.find((entry) => entry[0] === "J");
}