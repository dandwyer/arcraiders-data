import { Item } from "../src/types/item";
import { test, expect } from "bun:test";
import { readFileSync } from "fs";
import * as z from "zod"; // https://zod.dev/basics
import { Glob } from "bun";
import { resolve } from "path";

const root = resolve(import.meta.dir, "..");

function isValid(path: string): boolean {
  const data = JSON.parse(readFileSync(path, "utf-8"));
  const schema = Item.strict().describe(`StrictItem`);
  const result = schema.safeParse(data);
  if (result.success) {
    return true;
  }
  const prettyError = z.prettifyError(result.error);
  console.error(
    `Validation failed for ${path}, ${schema.description}: ${prettyError}`
  );
  return false;
}

test("validate item schema w/ small trinket item", () => {
  const path = `${root}/items/library_book.json`;
  expect(isValid(path)).toBe(true);
});

test("validate item schema w/ Bobcat I", () => {
  const path = `${root}/items/bobcat_i.json`;
  expect(isValid(path)).toBe(true);
});

test("validate item schema w/ Silencer I", () => {
  const path = `${root}/items/silencer_i.json`;
  expect(isValid(path)).toBe(true);
});

test("validate item schema w/ Candleberries", () => {
  const path = `${root}/items/candleberries.json`;
  expect(isValid(path)).toBe(true);
});

test("validate item schema w/ angled_grip_ii", () => {
  const path = `${root}/items/angled_grip_ii.json`;
  expect(isValid(path)).toBe(true);
});

test("validate item schema w/ compensator_iii", () => {
  const path = `${root}/items/compensator_iii.json`;
  expect(isValid(path)).toBe(true);
});

test("validate item schema w/ all items", () => {
  const glob = new Glob(`${root}/items/*.json`);
  var numFiles = 0;
  var numErrors = 0;
  for (const path of glob.scanSync()) {
    if (!isValid(path)) {
      ++numErrors;
    }
    ++numFiles;
  }
  console.log(`Validated ${numFiles} items with ${numErrors} errors`);
  expect(numErrors).toBe(0);
});
