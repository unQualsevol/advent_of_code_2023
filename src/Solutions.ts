import {Solution} from "./types";
import {day01} from "./day01/Trebuchet";
import {day02} from "./day02/CubeConundrum";
import {day03} from "./day03/GearRatios";

export function getSolutions(): Solution[] {
	return [
		day01, day02, day03];
}