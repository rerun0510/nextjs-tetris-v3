import {
  FIELD_HEIGHT,
  FIELD_WALL_THICKNESS,
  FIELD_WIDTH,
  OPERABLE_FIELD_HEIGHT,
  OPERABLE_FIELD_WIDTH,
} from '../constants'
import { Cell } from '../types'

/** 空のセルを生成 */
export const createEmptyCells = (): Cell[][] =>
  Array.from({ length: FIELD_HEIGHT }, (_, i): Cell[] =>
    Array.from({ length: FIELD_WIDTH }, (_, j): Cell => {
      const isWall = !(
        i < OPERABLE_FIELD_HEIGHT + FIELD_WALL_THICKNESS &&
        FIELD_WALL_THICKNESS <= j &&
        j < OPERABLE_FIELD_WIDTH + FIELD_WALL_THICKNESS
      )
      return {
        color: isWall ? 'gray' : '',
        isFixed: isWall,
        isCurrent: false,
        isGhost: false,
      }
    })
  )
