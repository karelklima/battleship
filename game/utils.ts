import { GRID_SIZE } from "./config.ts";
import { type SectorCoordinates, type SectorIndex } from "./types.ts";

/** Generates a range of integers of given length */
export const range = (len: number) => [...Array(len).keys()];

/** Converts row and column board coordinates to one dimensional index */
export const index = ([row, column]: SectorCoordinates): SectorIndex =>
  GRID_SIZE * row + column;

/** Converts one-dimensional index to row and column board coordinates */
export const coordinates = (index: SectorIndex) => [
  Math.floor(index / GRID_SIZE),
  index % GRID_SIZE,
];

/** Generates random integer smaller than given maximum */
export const randomInt = (max: number) => Math.floor(Math.random() * max);

/** Generates random boolean */
export const randomBoolean = () => Math.floor(Math.random() * 2) === 1;

/** Performs bitwise AND operation on two boolean arrays */
export const bitwiseAnd = (arr1: boolean[], arr2: boolean[]) =>
  arr1.map((value, key) => value === true && arr2[key] === true);

/** Performs bitwise OR operation on two boolean arrays */
export const bitwiseOr = (arr1: boolean[], arr2: boolean[]) =>
  arr1.map((value, key) => value === true || arr2[key] === true);

/** Returns alphabetical label for given index */
export const label = (index: number) =>
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.min(index, 25)];

/** Returns user friendly coordinates, e.g. "A1" or "B5" */
export const labeledCoordinates = (index: SectorIndex) => {
  const [row, column] = coordinates(index);
  return `${label(column)}${row + 1}`;
};
