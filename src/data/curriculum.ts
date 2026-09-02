import { Module, Badge } from "../types";
import { BADGES_DATA, INITIAL_LEADERBOARD, INITIAL_STUDY_GROUPS } from "./curriculum/mockData";
import { OFFLINE_HANDBOOK_TOPICS } from "./curriculum/handbook";
import { ALGORITHM_PROBLEMS, INITIAL_ALGORITHM_LEADERBOARD } from "./problemsData";
import { TOPIC_1_SYNTAX_IO } from "./curriculum/topic1_syntax_io";
import { TOPIC_2_VARIABLES_TYPES } from "./curriculum/topic2_variables_types";
import { TOPIC_3_OPERATORS_EXPR } from "./curriculum/topic3_operators_expr";
import { TOPIC_4_BRANCHING } from "./curriculum/topic4_branching";
import { TOPIC_5_FOR_LOOPS } from "./curriculum/topic5_for_loops";
import { TOPIC_6_WHILE_LOOPS } from "./curriculum/topic6_while_loops";
import { TOPIC_7_STRINGS } from "./curriculum/topic7_strings";
import { TOPIC_8_FUNCTIONS } from "./curriculum/topic8_functions";
import { TOPIC_9_RECURSION } from "./curriculum/topic9_recursion";
import { TOPIC_10_LISTS } from "./curriculum/topic10_lists";
import { TOPIC_11_MATRIX } from "./curriculum/topic11_matrix";
import { TOPIC_12_COMPREHENSIVE } from "./curriculum/topic12_comprehensive";
import { TOPIC_13_APPLIED_PROJECTS } from "./curriculum/topic13_applied_projects";

export { BADGES_DATA, INITIAL_LEADERBOARD, INITIAL_STUDY_GROUPS, OFFLINE_HANDBOOK_TOPICS, ALGORITHM_PROBLEMS, INITIAL_ALGORITHM_LEADERBOARD };

export const CURRICULUM_MODULES: Module[] = [
  TOPIC_1_SYNTAX_IO,
  TOPIC_2_VARIABLES_TYPES,
  TOPIC_3_OPERATORS_EXPR,
  TOPIC_4_BRANCHING,
  TOPIC_5_FOR_LOOPS,
  TOPIC_6_WHILE_LOOPS,
  TOPIC_7_STRINGS,
  TOPIC_8_FUNCTIONS,
  TOPIC_9_RECURSION,
  TOPIC_10_LISTS,
  TOPIC_11_MATRIX,
  TOPIC_12_COMPREHENSIVE,
  TOPIC_13_APPLIED_PROJECTS
];

