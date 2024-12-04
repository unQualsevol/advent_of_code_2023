import {Result, Solution} from "../types";

interface Coordinate {
	y: number;
	x: number;
}

function getEdgeKey(start: number, end: number): string {
	return `${Math.min(start, end)},${Math.max(end, start)}`;
}

function getGalaxies(sky: string[][], factor: number) {
	const galaxies: Coordinate[] = [];
	const maxY = sky.length;
	const maxX = sky[0].length;
	const emptyRows = sky.reduce((acc, current, index) => {
		if(current.every((point) => point === ".")){
			acc.push(index);
		}
		return acc;
	},[] as number[]);
	const emptyColumns: number[] = [];
	for (let i = 0; i < maxX; i++) {
		if(sky.every((line) => line[i] === ".")){
			emptyColumns.push(i);
		}
	}

	let timesExpandedY = 0;
	for (let y = 0; y < maxY; y++) {
		if(emptyRows.includes(y)) {
			timesExpandedY++;
			continue;
		}
		let timesExpandedX = 0;
		for (let x = 0; x < maxX; x++) {
			if(emptyColumns.includes(x)) {
				timesExpandedX++;
				continue;
			}
			if(sky[y][x] === "#"){
				galaxies.push({y: y+(timesExpandedY*(factor-1)), x: x+(timesExpandedX*(factor-1))});
			}
		}
	}

	return galaxies;
}

function calculateDistance(galaxy: Coordinate, galaxy2: Coordinate) {
	return Math.abs(galaxy.y-galaxy2.y) + Math.abs(galaxy.x-galaxy2.x);
}

function getEdges(galaxies: Coordinate[]) {
	const edges: Record<string, number> = {};
	galaxies.forEach((galaxy, index) => {
		galaxies.forEach((galaxy2, index2) => {
			if (index !== index2) {
				const key = getEdgeKey(index, index2);
				if (!edges[key])
					edges[key] = calculateDistance(galaxy, galaxy2);
			}
		});
	})
	return edges;
}

function getSumOfGalaxyDistances(sky: string[][], factor: number) {
	const galaxies: Coordinate[] = getGalaxies(sky, factor);
	const edges = getEdges(galaxies);
	return Object.values(edges).reduce((acc, current) => acc + current, 0);
}

export const day11: Solution = (input: string): Result => {
	const sky = input.split("\n").map(line => line.split(""));
	return {first: getSumOfGalaxyDistances(sky, 2), second: getSumOfGalaxyDistances(sky, 1000000)};
}