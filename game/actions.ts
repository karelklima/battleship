import { batch } from "@preact/signals";

import {
  createInitialMessage,
  createInitialShipPositions,
  createInitialShots,
  gameOver,
  hitCount,
  message,
  ships,
  shots,
} from "./state.ts";
import { type SectorIndex } from "./types.ts";
import { labeledCoordinates } from "./utils.ts";

/**
 * This action is invoked when a player targets certain sector on
 * the battlefield. The shot is recorded and the app state is updated
 * accordingly.
 *
 * @param sectorIndex Where to fire
 */
export const fire = (sectorIndex: SectorIndex) => {
  const previousHitCount = hitCount.value;
  const previousShots = shots.value;
  previousShots[sectorIndex] = true;

  // add newly fired shot to the list of all shots
  shots.value = [...previousShots];

  const createMessage = (title: string, subtitle: string) => ({
    title,
    subtitle,
  });

  if (gameOver.value) {
    message.value = createMessage(
      "Congratulations, captain!",
      "Enemy has been obliterated.",
    );
    return;
  }

  const newHitCount = hitCount.value;
  const coordinates = labeledCoordinates(sectorIndex);

  if (newHitCount > previousHitCount) {
    // shot on target
    message.value = createMessage(`${coordinates} hit!`, "Keep firing!");
  } else {
    // missed shot
    message.value = createMessage(`${coordinates} miss...`, " Fire again!");
  }
};

/**
 * This action is invoked in order to play a new game; it resets app state
 */
export const reset = () => {
  batch(() => {
    shots.value = createInitialShots();
    ships.value = createInitialShipPositions();
    message.value = createInitialMessage();
  });
};
