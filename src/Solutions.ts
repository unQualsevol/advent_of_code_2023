import {Solution} from "./types";
import {day01} from "./day01/Trebuchet";
import {day02} from "./day02/RockPaperScissors";
import {day03} from "./day03/RucksackReorganization";
import {day04} from "./day04/CampCleanup";
import {day05} from "./day05/SupplyStacks";
import {day06} from "./day06/TuningTrouble";
import {day07} from "./day07/NoSpaceLeftOnDevice";
import {day08} from "./day08/TreetopTreeHouse";
import {day09} from "./day09/RopeBridge";
import {day10} from "./day10/CathodeRayTube";
import {day11} from "./day11/MonkeyInTheMiddle";
import {day12} from "./day12/HillClimbingAlgorithm";
import {day13} from "./day13/DistressSignal";

export function getSolutions(): Solution[] {
	return [
		day01, day02, day03, day04, day05,
		day06, day07, day08, day09, day10,
		day11, day12, day13];
}