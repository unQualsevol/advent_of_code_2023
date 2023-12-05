import {Result, Solution} from "../types";

interface Mapping {
	targetStart: number;
	sourceStart: number;
	length: number;
}

interface SeedRange {
	start: number;
	length: number;
}

export const day05: Solution = (input: string): Result => {
	const [seedsLine, ...mappingBlocks] = input.split(/\r?\n\n/);
	const [_, ...seedIds] = seedsLine.split(" ");

	const seeds: number[] = seedIds.map((seed) => {
		return Number(seed);
	})

	const mappings: Mapping[][] = mappingBlocks.map((mapping) => {
		const [_, ...ranges] = mapping.split(/\n/);
		return ranges.map((range) => {
			const [targetStart, sourceStart, length] = range.split(" ").map((value) => Number(value));
			return {targetStart, sourceStart, length, map: new Map<number, number>()};
		});
	})

	return {first: first([...seeds], mappings), second: second([...seeds], mappings)};
}

function first(seeds: number[], mappings: Mapping[][]) {
	for (let i = 0; i < seeds.length; i++) {
		seeds[i] = calculateLocationFromSeed(seeds[i], mappings);
	}
	return Math.min.apply(Math, seeds);
}

function calculateLocationFromSeed(seed: number, mappings: Mapping[][]) {
	return calculate(seed, mappings, "sourceStart", "targetStart");
}

function calculate(value: number, mappings: Mapping[][], source: keyof Mapping, target: keyof Mapping ) {
	for (const mapping of mappings) {
		value = calculateValue(value, mapping, source, target);
	}
	return value;
}

function calculateValue(value: number, mappings: Mapping[], source: keyof Mapping, target: keyof Mapping) {
	const validRange = mappings.find((range) => value >= range[source] && value < range[source] + range.length);
	if (validRange) {

		return validRange[target] + (value - validRange[source]);
	}
	return value;
}

function second(seeds: number[], mappings: Mapping[][]) {
	const reversedMappings = [...mappings].reverse();
	let location = 0;
	let stepping = 1000000;
	const seedRanges = getSeedRanges(seeds);
	while (stepping > 0) {
		let seed;
		do {
			seed = calculateSeedFromLocation(location, reversedMappings);
			location += stepping;
		} while (!isValidSeed(seed, seedRanges));
		location -= 2 * stepping;
		stepping = Math.round(stepping / 10);
		location += stepping;
	}

	return location + 1;
}

function calculateSeedFromLocation(location: number, mappings: Mapping[][]) {
	return calculate(location, mappings, "targetStart", "sourceStart");
}

function isValidSeed(seed: number, seedRanges: SeedRange[]) {
	return seedRanges.some(({start, length}) => seed >= start && seed < start + length);
}

function getSeedRanges(seeds: number[]) {
	const seedRanges: SeedRange[] = [];
	for (let i = 0; i < seeds.length; i += 2) {
		const start = seeds[i];
		const length = seeds[i + 1];
		seedRanges.push({start, length});
	}
	return seedRanges;
}