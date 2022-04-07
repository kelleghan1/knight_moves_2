export interface CoordsType {
  x: number
  y: number
}

export type SetDestinationCoordsType = (coords: CoordsType) => void

export type SetTurnsTakenType = (coords: CoordsType[]) => void

export interface QuadrantCoordsType {
  [key: number]: { y: { [key: number]: boolean } }
}

export type QuadrantSizeEnumType = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
