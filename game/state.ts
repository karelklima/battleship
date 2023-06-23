import { computed, signal } from "@preact/signals";
import { zip } from "$std/collections/zip.ts";

import { generateOccupancyMap, generateShipsPositions } from "./generator.ts";
import { GRID_SIZE } from "./config.ts";
import { range } from "./utils.ts";
import { SectorStatus, type Ship } from "./types.ts";

/**
 * This file contains the application state. There are three core state variables:
 * - ships - contains a list of ships and their positions on the battlefield
 * - shots - contains a sector map of shots that the player made, i.e. which sectors were targeted
 * - message - contains a message to display to the player
 *
 * All of the rest of the application state is reactively computed from these three
 * core state variables.
 */

/** Generates random configuration of ships on the battlefield */
export const createInitialShipPositions = () => generateShipsPositions();

/** Generates empty initial sector map of shots (i.e. no shots taken yet) */
export const createInitialShots = () =>
  range(GRID_SIZE * GRID_SIZE).map((_) => false);

/** Generates initial message for the player */
export const createInitialMessage = () => ({
  title: "Attack enemy ships!",
  subtitle: "Pick a spot and give the order.",
});

/** Contains a list of ships and their positions on the battlefield */
export const ships = signal(createInitialShipPositions());

/** Contains a sector map of shots the the played made */
export const shots = signal(createInitialShots());

/** Contains a message to display to the player */
export const message = signal(createInitialMessage());

/** Partitions all ships between destroyed group and still fighting group */
export const shipsStatus = computed(() => {
  const destroyed: Ship[] = [];
  const fighting: Ship[] = [];
  for (const ship of ships.value) {
    let intact = false;
    for (const sectorIndex of ship) {
      if (shots.value[sectorIndex] === false) {
        // there is at least one part of ship that has not been targeted
        intact = true;
        break;
      }
    }
    if (!intact) {
      destroyed.push(ship);
    } else {
      fighting.push(ship);
    }
  }
  return {
    destroyed,
    fighting,
  };
});

/** Computes whether the game is over based on the number of ships that are still intact */
export const gameOver = computed(() => {
  const { fighting } = shipsStatus.value;
  return fighting.length < 1;
});

/**
 * Computes a map of sectors that must be empty based on the previous shots and hits
 * so that the user cannot target these sectors. The purpose of this is that when a ship
 * is destroyed, the immediate sectors should be disabled for targeting, because they
 * cannot contain a ship or its part. If the game is over, all the squares are marked as
 * empty / disabled to target by the player, as there are no more ships to destroy.
 */
const emptySquares = computed(() => {
  if (gameOver.value) {
    return range(GRID_SIZE * GRID_SIZE).map((_) => true);
  }
  const { destroyed } = shipsStatus.value;
  const blockMaps = destroyed.map((ship) => generateOccupancyMap(ship, 1));
  const emptyArr = range(GRID_SIZE * GRID_SIZE).map((_) => false);
  return zip(emptyArr, ...blockMaps).map((flags) => flags.includes(true));
});

/** Computes a map of sectors that contain a ship part that has been shot by the player */
const shipHits = computed(() => {
  const hits = range(GRID_SIZE * GRID_SIZE).map((_) => false);
  for (const ship of ships.value) {
    for (const boardIndex of ship) {
      if (shots.value[boardIndex] === true) {
        hits[boardIndex] = true;
      }
    }
  }
  return hits;
});

/** Computes the number of successful shots on targets */
export const hitCount = computed(() => {
  return shipHits.value.filter((it) => it).length;
});

/** Computes the number of missed shots */
export const missCount = computed(() => {
  const shotsCount = shots.value.filter((it) => it).length;
  return shotsCount - hitCount.value;
});

/**
 * Computes the whole battlefield - the result is a list of battlefield
 * sectors represented by their status. For example, for a battlefield of
 * size 10x10, there will be 100 sector statuses computed by this function.
 * The statuses of the sectors may be:
 * - SANK - the sector contains a part of a ship that has been fully destroyed
 * - HIT - the sector contains a part of a ship that has been shot, but not fully destroyed
 * - MISS - the sector does not contain a ship, and the player targeted it
 * - EMPTY - the sector cannot be targeted, but does not contain a ship (e.g. a sector next to a destroyed ship)
 */
export const battlefield = computed(() => {
  return zip(shots.value, emptySquares.value, shipHits.value).map(
    ([isFired, isEmpty, isHit]) => {
      if (isEmpty && isHit) {
        return SectorStatus.SANK;
      }
      if (isHit) {
        return SectorStatus.HIT;
      }
      if (isFired) {
        return SectorStatus.MISS;
      }
      if (isEmpty) {
        return SectorStatus.EMPTY;
      }
      return SectorStatus.UNKNOWN;
    },
  );
});
