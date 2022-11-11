import { Mino } from '../enums'

import { Cell } from '.'

/**
 * ゲーム状態を管理するモデル
 */
export type TetrisGameState = {
  /** ミノの配置を表す多次元配列 */
  cells: Cell[][]
  /** 落下予定のミノを管理する配列 */
  nextMinos: Mino[]
}
