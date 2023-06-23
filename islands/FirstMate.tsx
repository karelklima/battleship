import { Button } from "../components/Button.tsx";
import { reset } from "../game/actions.ts";
import {
  gameOver,
  hitCount,
  message,
  missCount,
  shipsStatus,
} from "../game/state.ts";
import { range } from "../game/utils.ts";

/**
 * A component that provides various information to the player
 */
export default function FirstMate() {
  return (
    <div class="w-80 pt-16">
      <Message />
      <Stats />
      <EnemyShipsRemaining />
      <Reset />
    </div>
  );
}

/**
 * A component that displays messages to the player
 */
function Message() {
  const { title, subtitle } = message.value;
  return (
    <>
      <h2 class="text-2xl font-black">{title}</h2>
      <h3 class="text-xl font-black text-gray-500">{subtitle}</h3>
    </>
  );
}

/**
 * A component that displays shot statistics after the game is finished
 */
function Stats() {
  if (!gameOver.value) {
    return null;
  }
  const total = hitCount.value + missCount.value;
  const accuracy = total < 1
    ? "N/A"
    : (hitCount.value / total * 100).toFixed(0);
  return (
    <div class="grid grid-cols-2 w-64 my-8">
      <div class="item">Shots on target</div>
      <div class="item">{hitCount}</div>
      <div class="item">Missed shots</div>
      <div class="item">{missCount}</div>
      <div class="item">Accuracy</div>
      <div class="item">{accuracy}%</div>
    </div>
  );
}

/**
 * A component that displays remaining ships and their shape / size
 */
function EnemyShipsRemaining() {
  if (gameOver.value) {
    return null;
  }

  const { fighting } = shipsStatus.value;

  const renderShips = () =>
    fighting.map((ship) => {
      return <Ship size={ship.length} />;
    });

  return (
    <>
      <h2 class="text-xl font-bold mt-8">Enemy ships remaining</h2>
      {renderShips()}
    </>
  );
}

/**
 * A component to display visual information about a ship - its name and shape
 */
function Ship({ size }: { size: number }) {
  const renderLabel = () => {
    switch (size) {
      case 5:
        return "Battleship";
      case 4:
        return "Destroyer";
      default:
        return "Unknown ship";
    }
  };

  const renderCells = () => {
    return range(size).map((_) => <div class="item bg-gray-400"></div>);
  };

  return (
    <>
      <div class="h-8 pt-2">{renderLabel()}</div>
      <div
        class={`grid grid-rows-1 grid-cols-12 gap-1 w-80 h-6 p-px`}
      >
        {renderCells()}
      </div>
    </>
  );
}

/**
 * A component to restart the game when it is finished
 */
function Reset() {
  if (!gameOver.value) {
    return null;
  }
  return <Button onClick={reset}>PLAY AGAIN</Button>;
}
