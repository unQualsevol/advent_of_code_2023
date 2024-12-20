import {Solution} from "./types";
import {day01} from "./day01/Trebuchet";
import {day02} from "./day02/CubeConundrum";
import {day03} from "./day03/GearRatios";
import {day04} from "./day04/Scratchcards";
import {day05} from "./day05/IfYouGiveASeedAFertilizer";
import {day06} from "./day06/WaitForIt";
import {day07} from "./day07/CamelCards";
import {day08} from "./day08/HauntedWasteland";
import {day09} from "./day09/MirageMaintenance";
import {day10} from "./day10/PipeMaze";
import {day11} from "./day11/CosmicExpansion";

export function getSolutions(): Solution[] {
	return [
		day01, day02, day03, day04, day05,
		day06, day07, day08, day09, day10,
		day11,
	];
}