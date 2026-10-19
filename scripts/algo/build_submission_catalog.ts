import { writeFileSync } from "node:fs";
import { catalogSql } from "./submission_catalog";
writeFileSync(new URL("../../sql/algorithm_submission_catalog.sql", import.meta.url), catalogSql());
