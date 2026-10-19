import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { catalogSql, submissionCatalog } from "./algo/submission_catalog";

test("repair includes all 60 omitted exercises and the parity exercise from the incident", () => {
  assert.equal(submissionCatalog.length, 60);
  assert.equal(new Set(submissionCatalog.map(p => p.id)).size, 60);
  const parity = submissionCatalog.find(p => p.id === "rn-08")!;
  assert.equal(parity.testCases.length, 4);
  assert.equal(parity.testCases[0].expectedOutput, "So chan");
  assert.equal(parity.testCases[1].expectedOutput, "So le");
  assert.ok(submissionCatalog.every(p => p.testCases.length && p.problemStatement && p.title));
});

test("checked-in repair matches executable exercise data and preserves existing rows", () => {
  const sql = readFileSync(new URL("../sql/algorithm_submission_catalog.sql", import.meta.url), "utf8");
  assert.equal(sql, catalogSql());
  assert.match(sql, /ON CONFLICT \(id\) DO NOTHING/);
  assert.doesNotMatch(sql, /\b(DELETE|DROP|UPDATE)\b/);
});
