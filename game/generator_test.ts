import { assert, assertEquals } from "$std/testing/asserts.ts";

import { GRID_SIZE, SHIPS } from "./config.ts";
import {
  generateOccupancyMap,
  generateRandomShipPlacement,
  generateShipsPositions,
} from "./generator.ts";
import { coordinates, range } from "./utils.ts";

Deno.test({
  name: "Generator / generateRandomShipPlacement",
  fn() {
    const maxShip = generateRandomShipPlacement(GRID_SIZE);
    assert(maxShip.length === GRID_SIZE);
    const rows = new Set<number>();
    const cols = new Set<number>();
    for (const i of maxShip) {
      const [row, col] = coordinates(i);
      rows.add(row);
      cols.add(col);
    }
    assert(rows.size === 1 || cols.size === 1);

    const minShip = generateRandomShipPlacement(1);
    assert(minShip.length === 1);
  },
});

Deno.test({
  name: "Generator / generateShipBlockGrid",
  fn() {
    const maxShip = range(GRID_SIZE);
    const grid = generateOccupancyMap(maxShip, 2);
    const expected = [
      ...range(GRID_SIZE * 3).map((_) => true),
      ...range(GRID_SIZE * (GRID_SIZE - 3)).map((_) => false),
    ];
    assertEquals(grid, expected);

    const minShip = [GRID_SIZE + Math.floor(GRID_SIZE / 2)];
    const minGrid = generateOccupancyMap(minShip, 1);
    const blocked = minGrid.filter((it) => it === true);
    assert(blocked.length === 9);

    const microGrid = generateOccupancyMap(minShip, 0);
    const microBlocked = microGrid.filter((it) => it === true);
    assert(microBlocked.length === 1);
  },
});

Deno.test({
  name: "Generator / generateShipsPositions",
  fn() {
    const ships = generateShipsPositions();
    const lengths = ships.map((it) => it.length);
    assertEquals(lengths, SHIPS);
  },
});
