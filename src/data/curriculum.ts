import { Module, Badge } from "../types";
import { BADGES_DATA, INITIAL_LEADERBOARD, INITIAL_STUDY_GROUPS } from "./curriculum/mockData";
import { OFFLINE_HANDBOOK_TOPICS } from "./curriculum/handbook";
import { MODULE_1_INTRO } from "./curriculum/module1_intro";
import { MODULE_2_BRANCHING } from "./curriculum/module2_branching";
import { MODULE_3_LOOPS } from "./curriculum/module3_loops";
import { MODULE_4_STRINGS } from "./curriculum/module4_strings";
import { MODULE_5_LISTS } from "./curriculum/module5_lists";
import { MODULE_6_FUNCTIONS } from "./curriculum/module6_functions";
import { MODULE_7_ADVANCED } from "./curriculum/module7_advanced";

export { BADGES_DATA, INITIAL_LEADERBOARD, INITIAL_STUDY_GROUPS, OFFLINE_HANDBOOK_TOPICS };

export const CURRICULUM_MODULES: Module[] = [
  MODULE_1_INTRO,
  MODULE_2_BRANCHING,
  MODULE_3_LOOPS,
  MODULE_4_STRINGS,
  MODULE_5_LISTS,
  MODULE_6_FUNCTIONS,
  MODULE_7_ADVANCED
];
