import {Result, Solution} from "../types";

interface Coordinate {
	x: number;
	y: number;
}

const validUp = ["|", "7", "F"];
const validDown = ["|", "J", "L"];
const validLeft = ["-", "L", "F"];
const validRight = ["-", "J", "7"];
const wall = ["|", "7", "F", "J", "L"];

function getValue(coor:Coordinate): string {
	return map[coor.y][coor.x];
}

function up(coor: Coordinate): Coordinate {
	return {x: coor.x, y: coor.y-1};
}

function down(coor: Coordinate): Coordinate {
	return {x: coor.x, y: coor.y+1};
}

function left(coor: Coordinate): Coordinate {
	return {x: coor.x-1, y: coor.y};
}

function right(coor: Coordinate): Coordinate {
	return {x: coor.x+1, y: coor.y};
}

function isValidUp(coor: Coordinate):boolean {
	const newCoor = up(coor);
	if(newCoor.y < 0 || newCoor.y >= maxY) return false;
	return validUp.includes(getValue(newCoor));
}

function isValidDown(coor: Coordinate):boolean {
	const newCoor = down(coor);
	if(newCoor.y < 0 || newCoor.y >= maxY) return false;
	return validDown.includes(getValue(newCoor));
}

function isValidLeft(coor: Coordinate):boolean {
	const newCoor = left(coor);
	if(newCoor.x < 0 || newCoor.x >= maxX) return false;
	return validLeft.includes(getValue(newCoor));
}

function isValidRight(coor: Coordinate):boolean {
	const newCoor = right(coor);
	if(newCoor.x < 0 || newCoor.x >= maxX) return false;
	return validRight.includes(getValue(newCoor));
}

const getValidDirections: {[x: string]: (coor: Coordinate)=> Coordinate[]} = {
	"S": (coor: Coordinate): Coordinate[] => {
		const result: Coordinate[] = [];
		if(isValidUp(coor))
			result.push(up(coor))
		if(isValidDown(coor))
			result.push(down(coor))
		if(isValidLeft(coor))
			result.push(left(coor))
		if(isValidRight(coor))
			result.push(right(coor))
		return result;
	},
	"|": (coor: Coordinate): Coordinate[] => {
		const result: Coordinate[] = [];
		if(isValidUp(coor))
			result.push(up(coor))
		if(isValidDown(coor))
			result.push(down(coor))
		return result;
	},
	"-": (coor: Coordinate): Coordinate[] => {
		const result: Coordinate[] = [];
		if(isValidLeft(coor))
			result.push(left(coor))
		if(isValidRight(coor))
			result.push(right(coor))
		return result;
	},
	"7": (coor: Coordinate): Coordinate[] => {
		const result: Coordinate[] = [];
		if(isValidDown(coor))
			result.push(down(coor))
		if(isValidLeft(coor))
			result.push(left(coor))
		return result;
	},
	"F": (coor: Coordinate): Coordinate[] => {
		const result: Coordinate[] = [];
		if(isValidDown(coor))
			result.push(down(coor))
		if(isValidRight(coor))
			result.push(right(coor))
		return result;
	},
	"J": (coor: Coordinate): Coordinate[] => {
		const result: Coordinate[] = [];
		if(isValidUp(coor))
			result.push(up(coor))
		if(isValidLeft(coor))
			result.push(left(coor))
		return result;
	},
	"L": (coor: Coordinate): Coordinate[] => {
		const result: Coordinate[] = [];
		if(isValidUp(coor))
			result.push(up(coor))
		if(isValidRight(coor))
			result.push(right(coor))
		return result;
	},
	".": (): Coordinate[] => [],

}

function isWall(value: string) {
	return wall.includes(value);
}

let map: string[][];
let maxY: number;
let maxX: number;

function extracted(polygon: Coordinate[], y: number, x: number) {
	const num_vertices = polygon.length
	let inside = false;
	let p1 = polygon[0];
	let p2: Coordinate;
	for (let i = 1; i <= num_vertices; i++) {
		p2 = polygon[i % num_vertices];
		if (y > Math.min(p1.y, p2.y)) {
			if (y <= Math.max(p1.y, p2.y)) {
				if (x <= Math.max(p1.x, p2.x)) {
					const x_intersection = (y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;

					if (p1.x === p2.x || x <= x_intersection) {
						inside = !inside;
					}
				}
			}
		}
		p1 = p2;
	}
	return inside;
}

export const day10: Solution = (input: string): Result => {
	map = input.split("\n").map(line => line.split(""));
	maxY = map.length;
	maxX = map[0].length;


	let startX: number;
	const startY = map.findIndex((current) => {
		const posX = current.indexOf("S");
		if(posX >= 0) startX = posX;
		return posX >= 0;
	})
	const startPosition:Coordinate = {x: startX!, y: startY};

	function isNotVisited(current: Coordinate) {
		return !isVisited(current)
	}

	function isVisited(current: Coordinate) {
		return visited.some((coor) => coor.x === current.x && coor.y === current.y);
	}


	let next = getValidDirections[getValue(startPosition)](startPosition)[0];
	const visited:Coordinate[] = [startPosition];
	while (next) {
		visited.push(next);
		next = (getValidDirections[getValue(next)](next)).filter(isNotVisited)[0];
	}

	const polygon = visited;

	let count = 0;
	for (let y = 0; y < maxY; y++) {
		for (let x = 0; x < maxX; x++) {
			if (isNotVisited({y,x}) && extracted(polygon, y, x)) {
				count++;
			}
		}
	}

	return {first: visited.length/2, second: count};
}