import {Solution} from "./types";
import {day01} from "./day01/Trebuchet";
import {day02} from "./day02/CubeConundrum";
import {day03} from "./day03/GearRatios";
import {day04} from "./day04/Scratchcards";
import {day05} from "./day05/IfYouGiveASeedAFertilizer";
import {day06} from "./day06/WaitForIt";

export function getSolutions(): Solution[] {
	return [
		day01, day02, day03, day04, day05, day06];
}