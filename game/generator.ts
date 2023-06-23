import { GRID_SIZE, SHIPS } from "./config.ts";
import { type SectorIndex, type Ship } from "./types.ts";
import {
  bitwiseAnd,
  bitwiseOr,
  coordinates,
  index,
  randomBoolean,
  randomInt,
  range,
} from "./utils.ts";

/**
 * Generates random ship placement on the grid and returns the list
 * of board indexes that the ship occupies.
 *
 * @param shipSize Size of the ship to be generated
 * @return Ship defined by indexes on board that it occupies
 */
export const generateRandomShipPlacement = (shipSize: number): Ship => {
  // decide whether the ship is oriented horizontally or vertically
  const horizontal = randomBoolean();
  // pick a random starting coordinate limited by the ship size and orientation
  // so that the ship cannot be generated out of bounds of the grid
  const row = randomInt(horizontal ? GRID_SIZE : GRID_SIZE - shipSize + 1);
  const col = randomInt(horizontal ? GRID_SIZE - shipSize + 1 : GRID_SIZE);

  const sectorIndexes: SectorIndex[] = [];
  for (let i = 0; i < shipSize; i++) {
    if (horizontal) {
      sectorIndexes.push(index([row, col + i]));
    } else {
      sectorIndexes.push(index([row + i, col]));
    }
  }

  return sectorIndexes;
};

/**
 * Generates a block map of indexes that a ship occupies, including her immediate surroundings
 * defined as a distance in number of squares from the ship
 *
 * @param ship Ship defined by indexes on board that it occupies
 * @param distance Blocked area around the ship
 * @returns blocked indexes on board that cannot be occupied by other ships
 */
export const generateOccupancyMap = (
  ship: Ship,
  distance: number,
): boolean[] => {
  const [firstRow, firstColumn] = coordinates(ship[0]);
  const [lastRow, lastColumn] = coordinates(
    ship[ship.length - 1],
  );

  // calculate area limits using ship area and its surroundings of size `distance`
  const minRow = firstRow - distance;
  const maxRow = lastRow + distance;
  const minCol = firstColumn - distance;
  const maxCol = lastColumn + distance;

  const blockGrid = range(GRID_SIZE * GRID_SIZE).map((i) => {
    const [row, col] = coordinates(i);
    if (row >= minRow && row <= maxRow && col >= minCol && col <= maxCol) {
      return true;
    }
    return false;
  });

  return blockGrid;
};

/**
 * Randomly generates ships on the battlefield based on the preconfigured
 * board size and number and size of ships.
 *
 * The algorithm may take too long in the worst case scenario if there is
 * too many ships, therefore if a random place for a ship is not found in
 * a reasonable time, the ship will not be present in the game. Chances of
 * that happening are statistically close to impossible.
 *
 * @returns Ships and their position on board represented by an array of
 * sector indexes that the ship occupies
 */
export const generateShipsPositions = (): Ship[] => {
  const ships: Ship[] = [];

  // Map of sectors occupied by already generated ships
  let cumulativeOccupancyMap = range(GRID_SIZE * GRID_SIZE).map((_) => false);

  for (const shipSize of SHIPS) {
    let attempts = 0;
    while (attempts++ < 100) {
      const candidateShip = generateRandomShipPlacement(shipSize);
      const immediateOccupancyMap = generateOccupancyMap(candidateShip, 0);
      const collisions = bitwiseAnd(
        cumulativeOccupancyMap,
        immediateOccupancyMap,
      );

      if (collisions.filter((it) => it === true).length > 0) {
        // collision detected, a new random ship needs to be generated
        continue;
      }

      // update sector occupancy map
      const occupancyMap = generateOccupancyMap(candidateShip, 1);
      cumulativeOccupancyMap = bitwiseOr(cumulativeOccupancyMap, occupancyMap);
      ships.push(candidateShip);
      break;
    }
  }

  return ships;
};
