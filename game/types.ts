/** Two dimensional coordinates (row and column) of sector on the battlefield */
export type SectorCoordinates = [number, number];

/** One dimensional coordinates of sector on the battlefield */
export type SectorIndex = number;

/** Ship, defined by sectors it occupies on the battlefield */
export type Ship = SectorIndex[];

/** Status of one sector of the battlefield corresponding to column and row coordinates */
export enum SectorStatus {
  UNKNOWN,
  EMPTY,
  MISS,
  HIT,
  SANK,
}
