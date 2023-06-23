import { type ComponentChildren } from "preact";

import { GRID_SIZE } from "../game/config.ts";
import { battlefield } from "../game/state.ts";
import { index, label } from "../game/utils.ts";
import { fire } from "../game/actions.ts";
import { SectorStatus } from "../game/types.ts";
import { IconCross, IconDot } from "../components/Icons.tsx";

export default function Battlefield() {
  const renderCells = () => {
    const cells = [<Label />];
    for (let col = 0; col < GRID_SIZE; col++) {
      cells.push(<Label>{label(col)}</Label>);
    }
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = -1; col < GRID_SIZE; col++) {
        if (col === -1) {
          cells.push(<Label>{row + 1}</Label>);
        } else {
          cells.push(<Sector index={index([row, col])} />);
        }
      }
    }
    return cells;
  };

  return (
    <div
      class={`grid grid-rows-${GRID_SIZE + 1} grid-cols-${
        GRID_SIZE + 1
      } gap-px w-96 h-96 p-px`}
    >
      {renderCells()}
    </div>
  );
}

/**
 * A component to display sector coordinates on the battlefield
 */
function Label({ children }: { children?: ComponentChildren }) {
  return (
    <div class="item relative bg-white text-center leading-8 text-sm">
      {children}
    </div>
  );
}

/**
 * A component to visualize one sector on the battlefield, based on the sector status
 */
function Sector({ index }: { index: number }) {
  const status = battlefield.value[index];

  const style = (classes: string) =>
    `item relative border-1 border-grey-500 m-[-1px] ${classes}`;
  const hitStyle = (color: string) =>
    style(
      `border-2 border-${color}-500 bg-${color}-100 text-${color}-500 z-10`,
    );

  switch (status) {
    case SectorStatus.UNKNOWN:
      return (
        <div
          class={style("cursor-crosshair hover:border-blue-500 hover:z-20")}
          onClick={() => fire(index)}
        />
      );
    case SectorStatus.EMPTY:
      return (
        <div class={style("text-gray-300")}>
          <IconDot />
        </div>
      );
    case SectorStatus.MISS:
      return (
        <div class={style("text-gray-700")}>
          <IconDot />
        </div>
      );
    case SectorStatus.HIT:
      return (
        <div class={hitStyle("blue")}>
          <IconCross />
        </div>
      );
    case SectorStatus.SANK:
      return (
        <div class={hitStyle("red")}>
          <IconCross />
        </div>
      );
  }
}
