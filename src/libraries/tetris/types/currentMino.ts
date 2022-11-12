import { Mino } from '../enums'

import { Deg } from '.'

export type CurrentMino = {
  pointX: number
  pointY: number
  mino: Mino
  deg: Deg
  canHold: boolean
}
