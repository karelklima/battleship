import { assert, assertEquals } from "$std/testing/asserts.ts";

import { GRID_SIZE } from "./config.ts";
import {
  bitwiseAnd,
  bitwiseOr,
  coordinates,
  index,
  label,
  labeledCoordinates,
  randomBoolean,
  randomInt,
  range,
} from "./utils.ts";

Deno.test({
  name: "Utils / coordinates",
  fn() {
    const coordinatesList = [...Array(GRID_SIZE * GRID_SIZE).keys()].map(
      coordinates,
    );
    const expected = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        expected.push([row, col]);
      }
    }
    assertEquals(coordinatesList, expected);
  },
});

Deno.test({
  name: "Utils / index",
  fn() {
    const indexList = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        indexList.push(index([row, col]));
      }
    }
    const expected = [...Array(GRID_SIZE * GRID_SIZE).keys()];
    assertEquals(indexList, expected);
  },
});

Deno.test({
  name: "Utils / randomBoolean",
  fn() {
    const value = randomBoolean();
    assert(value === true || value === false);
  },
});

Deno.test({
  name: "Utils / randomInt",
  fn() {
    const value = randomInt(100);
    assert(value >= 0 || value < 100 && Math.ceil(value) === value);
  },
});

Deno.test({
  name: "Utils / range",
  fn() {
    assertEquals(range(0), []);
    assertEquals(range(1), [0]);
    assertEquals(range(10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  },
});

Deno.test({
  name: "Utils / bitwiseAnd",
  fn() {
    assertEquals(bitwiseAnd([true], [false]), [false]);
    assertEquals(bitwiseAnd([false], [true]), [false]);
    assertEquals(bitwiseAnd([false], [false]), [false]);
    assertEquals(bitwiseAnd([true], [true]), [true]);
  },
});

Deno.test({
  name: "Utils / bitwiseOr",
  fn() {
    assertEquals(bitwiseOr([true], [false]), [true]);
    assertEquals(bitwiseOr([false], [true]), [true]);
    assertEquals(bitwiseOr([false], [false]), [false]);
    assertEquals(bitwiseOr([true], [true]), [true]);
  },
});

Deno.test({
  name: "Utils / label",
  fn() {
    assertEquals(label(0), "A");
    assertEquals(label(25), "Z");
    assertEquals(label(26), "Z");
  },
});

Deno.test({
  name: "Utils / labelCoordinates",
  fn() {
    assertEquals(labeledCoordinates(0), "A1");
    assertEquals(labeledCoordinates(1), "B1");
    assertEquals(labeledCoordinates(5), "F1");
  },
});
