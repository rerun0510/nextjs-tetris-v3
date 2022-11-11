import _ from 'lodash'

import {
  CURRENT_MINO_TEMPLATE,
  FIELD_HEIGHT,
  MINO_INIT_POSITION_Y,
} from './constants'
import { Mino, minos } from './enums'
import {
  Action,
  ActionHorizontal,
  Cell,
  TetrisGameState,
} from './types'
import { CurrentMino } from './types/currentMino'
import { createEmptyCells, createNextMinos } from './utils'

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
   * @param action 操作内容
   */
  mainLoop(action?: Action): void {
    if (this._count % 10 === 0) {
      // 落下処理
      this.drop()
    } else {
      this.action(action)
    }
    // セルを更新
    this.updateCells()
    this._count++
  }

  /**
   * 操作中のミノの落下処理
   *
   * 落下完了の場合はミノを固定化し、新しいミノを排出する
   */
  private drop(): void {
    // 操作中のミノが落下完了するまでの最短距離を算出
    const distance = this.calculateDistance()
    if (distance) {
      // 通常の落下
      this._currentMino = {
        ...this._currentMino,
        pointY: this._currentMino.pointY + 1,
      }
    } else {
      // ミノの固定化
      const { pointX, pointY, mino, deg } =
        this._currentMino
      const { points, color } = minos[mino]
      const point = points[deg]
      for (let i = 0; i < point.length; i++) {
        for (let j = 0; j < point[i].length; j++) {
          if (point[i][j]) {
            this._fixedCells[i + pointY][j + pointX] = {
              color,
              isFixed: true,
              isCurrent: false,
              isGhost: false,
            }
          }
        }
      }
      // 新しいミノを排出
      this._currentMino = {
        ...CURRENT_MINO_TEMPLATE,
        mino: this.popNextMino(),
        pointY: MINO_INIT_POSITION_Y,
      }
    }
  }

  /**
   * ゲームの操作を行う
   * @param action 操作内容
   */
  private action(action?: Action) {
    switch (action) {
      case 'right':
      case 'left':
        this.actionHorizontal(action)
        break
      default:
        break
    }
  }

  /**
   * ミノの水平移動
   * @param action 移動方向
   */
  private actionHorizontal(action: ActionHorizontal) {
    const { pointX, pointY, mino, deg } = this._currentMino
    const point = minos[mino].points[deg]
    // 壁・固定されたミノとの衝突判定
    for (let i = 0; i < point.length; i++) {
      for (let j = 0; j < point[i].length; j++) {
        if (
          point[i][j] &&
          this._fixedCells[i + pointY][
            j + pointX + (action === 'right' ? 1 : -1)
          ].isFixed
        ) {
          return
        }
      }
    }
    // 左右に1セル分移動
    this._currentMino = {
      ...this._currentMino,
      pointX:
        this._currentMino.pointX +
        (action === 'right' ? 1 : -1),
    }
  }

  /**
   * セルを最新の状態に更新する
   */
  private updateCells(): void {
    const { pointX, pointY, mino, deg } = this._currentMino
    const { points, color } = minos[mino]
    const point = points[deg]
    const newCells = _.cloneDeep(this._fixedCells)

    // 操作中のミノを配置
    for (let i = 0; i < point.length; i++) {
      for (let j = 0; j < point[i].length; j++) {
        if (point[i][j]) {
          // 操作中のミノを配置
          newCells[i + pointY][j + pointX] = {
            color,
            isFixed: false,
            isCurrent: true,
            isGhost: false,
          }
        }
      }
    }

    // 操作中のミノが落下完了するまでの最短距離を算出
    const distance = this.calculateDistance()
    // 操作中のミノの落下予定地を設定
    if (distance) {
      for (let i = 0; i < point.length; i++) {
        for (let j = 0; j < point[i].length; j++) {
          if (
            point[i][j] &&
            !newCells[distance + i + pointY][j + pointX]
              .isCurrent
          ) {
            newCells[distance + i + pointY][j + pointX] = {
              color,
              isFixed: false,
              isCurrent: false,
              isGhost: true,
            }
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

  /**
   * 操作中のミノが落下完了するまでの距離を計算する
   * @returns 落下完了までのセル数
   */
  calculateDistance(): number {
    const { pointX, pointY, mino, deg } = this._currentMino
    const { points } = minos[mino]
    const point = points[deg]
    // 操作中のミノが衝突するまでの最短距離を算出
    let distance = FIELD_HEIGHT
    for (let i = 0; i < point.length; i++) {
      for (let j = 0; j < point[i].length; j++) {
        if (point[i][j]) {
          for (
            let k = i + pointY + 1;
            k < this._fixedCells.length;
            k++
          ) {
            if (this._fixedCells[k][j + pointX].isFixed) {
              distance =
                distance > k - (i + pointY) - 1
                  ? k - (i + pointY) - 1
                  : distance
            }
          }
        }
      }
    }
    return distance
  }
}
