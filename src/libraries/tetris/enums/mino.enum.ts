import { MINO_POINTS } from '../constants'
import { MinoPoints } from '../types'

const Mino = {
  NONE: 'none',
  I: 'i',
  O: 'o',
  T: 't',
  J: 'j',
  L: 'l',
  S: 's',
  Z: 'z',
} as const

/** ミノ種類を管理 */
export type Mino = typeof Mino[keyof typeof Mino]

type MinoMap = {
  [key in Mino]: {
    points: MinoPoints
    color: string
  }
}

/** 各ミノの形・色を管理 */
export const minos: MinoMap = {
  none: {
    points: MINO_POINTS['none'],
    color: '',
  },
  i: {
    points: MINO_POINTS['i'],
    color: '#7FCCE3',
  },
  o: {
    points: MINO_POINTS['o'],
    color: '#FFD900',
  },
  t: {
    points: MINO_POINTS['t'],
    color: '#884898',
  },
  j: {
    points: MINO_POINTS['j'],
    color: '#0071B0',
  },
  l: {
    points: MINO_POINTS['l'],
    color: '#EE7800',
  },
  s: {
    points: MINO_POINTS['s'],
    color: '#3EB370',
  },
  z: {
    points: MINO_POINTS['z'],
    color: '#F20000',
  },
}
