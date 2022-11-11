import { Mino } from '../enums'

type MinoPointNext = {
  [key in Mino]: {
    point: number[][]
  }
}

/**
 * Field外に表示するミノの形を表す多次元配列を管理
 *
 * MINO_POINTSでは不要なセルも生成されてしまうため別管理とする
 **/
export const MINO_POINTS_NEXT: MinoPointNext = {
  none: { point: [[]] },
  i: { point: [[1, 1, 1, 1]] },
  j: {
    point: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  l: {
    point: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  o: {
    point: [
      [1, 1],
      [1, 1],
    ],
  },
  s: {
    point: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  t: {
    point: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  z: {
    point: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
}
