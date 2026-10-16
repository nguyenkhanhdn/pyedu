import { Module, Badge, LessonPractice } from "../types";
import { ALGO_SAMPLE_SOLUTIONS, ALGO_STARTER_OVERRIDES } from "./problems/algoExtras";
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
import { WARMUP_PRACTICES } from "./curriculum/warmups";
import { polishPractice } from "../utils/problemText";

export { BADGES_DATA, INITIAL_LEADERBOARD, INITIAL_STUDY_GROUPS, OFFLINE_HANDBOOK_TOPICS, ALGORITHM_PROBLEMS, INITIAL_ALGORITHM_LEADERBOARD };

// Chèn bài tập khởi động dễ TRƯỚC bài tập chính, rồi sắp xếp ổn định theo độ khó (dễ → khó)
const DIFFICULTY_RANK: Record<string, number> = { "Cơ bản": 0, "Trung bình": 1, "Nâng cao": 2 };

// Shared algorithm exercises used to expose the complete solution as starter code.
const preparePractice = (practice: LessonPractice): LessonPractice => polishPractice({
  ...practice,
  sampleSolution: practice.sampleSolution ?? ALGO_SAMPLE_SOLUTIONS[practice.id || ""] ?? practice.solutionExplanation,
  starterCode: ALGO_STARTER_OVERRIDES[practice.id || ""] ?? practice.starterCode,
});

const withWarmups = (mod: Module): Module => ({
  ...mod,
  lessons: mod.lessons.map((lesson) => {
    const list =
      lesson.practices && lesson.practices.length > 0
        ? lesson.practices
        : WARMUP_PRACTICES[lesson.id]
        ? [...WARMUP_PRACTICES[lesson.id], lesson.practice]
        : null;
    if (!list) return { ...lesson, practice: preparePractice(lesson.practice) };
    const sorted = [...list].sort((a, b) => DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty]);
    return { ...lesson, practice: preparePractice(lesson.practice), practices: sorted.map(preparePractice) };
  })
});

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
].map(withWarmups);

