import _ from 'lodash'

import {
  FIELD_HEIGHT,
  FIELD_WALL_THICKNESS,
  FIELD_WIDTH,
  MINO_INIT_POSITION_X,
  MINO_INIT_POSITION_Y,
} from './constants'
import { Mino, minos } from './enums'
import { Cell, TetrisGameState } from './types'
import { CurrentMino } from './types/currentMino'
import { shuffleArray } from './utils'

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

/** ７種類のミノから並び順がランダムな配列を作成 */
const createNextMinos = (): Mino[] => [
  ...shuffleArray(
    Object.keys(minos).filter((v) => v !== 'none')
  ),
]

/** 操作中のミノの初期状態設定用テンプレート */
const CURRENT_MINO_TEMPLATE: CurrentMino = {
  pointX: MINO_INIT_POSITION_X,
  pointY: MINO_INIT_POSITION_Y,
  mino: 'none',
  deg: 0,
}

export class Tetris {
  /** ループの回数を管理する */
  private _count = 0
  /** ゲームの状態 */
  private _gameState: TetrisGameState
  /** 固定されたミノの配置を表す多次元配列 */
  private _fixedCells: Cell[][] = _.cloneDeep(
    createEmptyCells()
  )
  /** 操作中のミノを管理 */
  private _currentMino: CurrentMino

  /**
   * テトリスのゲームエンジン
   */
  constructor() {
    this._gameState = {
      cells: _.cloneDeep(createEmptyCells()),
      nextMinos: _.cloneDeep(createNextMinos()),
    }
    this._currentMino = {
      ...CURRENT_MINO_TEMPLATE,
      mino: this.popNextMino(),
    }
  }
  get gameState(): TetrisGameState {
    return this._gameState
  }

  /**
   * テトリスのメインループ処理
   * @param key キー情報
   */
  mainLoop(key: string): void {
    if (this._count % 10 === 0) {
      // TODO: 着地判定
      // 落下処理
      this.drop()
    } else {
      if (key) {
        console.log(key)
      }
    }
    // セルを更新
    this.updateCells()
    this._count++
  }

  /**
   * 操作中のミノの落下処理
   */
  private drop(): void {
    // TODO: 着地判定を実装したら修正する
    if (this._currentMino.pointY === 22) {
      this._currentMino = {
        ...CURRENT_MINO_TEMPLATE,
        mino: this.popNextMino(),
        pointY: MINO_INIT_POSITION_Y,
      }
    } else {
      this._currentMino = {
        ...this._currentMino,
        pointY: this._currentMino.pointY + 1,
      }
    }
  }

  /**
   * セルを最新の状態に更新する
   */
  private updateCells(): void {
    const { pointX, pointY, mino, deg } = this._currentMino
    const { points, color } = minos[mino]
    const point = points[deg]
    const newCells = _.cloneDeep(createEmptyCells())

    // 操作中のミノを配置
    for (let i = 0; i < point.length; i++) {
      for (let j = 0; j < point[i].length; j++) {
        if (point[i][j]) {
          // 操作中のミノを配置
          newCells[i + pointY][j + pointX] = {
            color,
            isCurrent: true,
            isGhost: false,
          }
        }
      }
    }

    // セルの更新
    this._gameState = {
      ...this._gameState,
      cells: newCells,
    }
  }

  /**
   * 待機中のミノ（NextMinos）から次に落下予定のミノを取り出す
   * @returns 次に落下するミノ
   */
  private popNextMino(): Mino {
    // NextMinosの残りが7未満の場合は新たに追加する
    const newNextMinos = [
      ...this._gameState.nextMinos,
      ...(() => {
        if (this._gameState.nextMinos.length <= 7) {
          return createNextMinos()
        }
        return []
      })(),
    ]
    // 先頭から次に落下予定のミノを取り出す
    const nextMino = newNextMinos.shift() ?? 'none'

    this._gameState = {
      ...this._gameState,
      nextMinos: _.cloneDeep(newNextMinos),
    }
    return nextMino
  }
}
