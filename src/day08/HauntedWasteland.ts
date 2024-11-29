import {Result, Solution} from "../types";

type Node = {L: string, R: string};

export const day08: Solution = (input: string): Result => {
	const inputAsLines = input.split(/\r?\n/);
	const instructions = inputAsLines[0];
	const nodeMap: Record<string, Node> = inputAsLines.slice(2).reduce((acc, line) => {
		const [_, key, L, R] = /(\w{3}).*(\w{3}).*(\w{3})/g.exec(line) ?? [];
		acc[key] = {L, R};
		return acc;
	}, {} as Record<string, Node>);

	return {first: first(nodeMap, instructions, "AAA", (current) => current === "ZZZ"), second: second(nodeMap, instructions)};
}

function first(nodeMap: Record<string, Node>, instructions: string, start: string, endCondition: (current: string) => boolean): number {
	let current = start;
	let index = 0;
	let steps = 0;
	while (!endCondition(current)) {
		current = nodeMap[current][instructions.slice(index,index+1) as keyof Node];
		index = (index+1)% instructions.length;
		steps++;
	}
	return steps;
}

function second(nodeMap: Record<string, Node>, instructions: string): number {
	let state = Object.keys(nodeMap)
		.filter((value) => value.endsWith("A"))
		.map((value) => first(nodeMap, instructions, value, (current) => current.endsWith("Z")));
	return lcm(...state);
}

const lcm = (...arr: number[]): number => {
	const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
	const _lcm = (x: number, y: number): number => (x * y) / gcd(x, y);
	return [...arr].reduce((a: number, b: number): number => _lcm(a, b));
};
