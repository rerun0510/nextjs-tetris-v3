import _ from 'lodash'

import {
  FIELD_HEIGHT,
  FIELD_WALL_THICKNESS,
  FIELD_WIDTH,
} from './constants'
import { Cell, TetrisGameState } from './types'

/** 空のセルを生成 */
const createEmptyCells = (): Cell[][] =>
  Array.from({ length: FIELD_HEIGHT }, (_, i): Cell[] =>
    Array.from({ length: FIELD_WIDTH }, (_, j): Cell => {
      const isWall = !(
        i < FIELD_HEIGHT + FIELD_WALL_THICKNESS &&
        FIELD_WALL_THICKNESS <= j &&
        j < FIELD_WIDTH + FIELD_WALL_THICKNESS
      )
      return {
        color: isWall ? 'gray' : '',
        isCurrent: false,
        isGhost: false,
      }
    })
  )

export class Tetris {
  /** ループの回数を管理する */
  private _count = 0
  /** ゲームの状態 */
  private _gameState: TetrisGameState = {
    cells: _.cloneDeep(createEmptyCells()),
    nextMinos: [],
  }

  get gameState(): TetrisGameState {
    return this._gameState
  }

  /**
   * テトリスのメインループ処理
   * @param key キー情報
   */
  mainLoop(key: string): void {
    if (this._count % 20 === 0) {
      this.drop()
    } else {
      if (key) {
        console.log(key)
      }
    }
    this._count++
  }

  /**
   * 操作中のミノの落下処理
   */
  private drop(): void {
    console.log(`drop:${new Date()}`)
  }
}
