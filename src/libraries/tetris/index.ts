import _ from 'lodash'

import {
  CURRENT_MINO_TEMPLATE,
  FIELD_HEIGHT,
  FIELD_WALL_THICKNESS,
  FIELD_WIDTH,
  MINO_INIT_POSITION_Y,
  OPERABLE_FIELD_WIDTH,
  SRS_OFFSETS,
  SRS_OFFSETS_I,
} from './constants'
import { Mino, minos } from './enums'
import {
  Action,
  ActionHorizontal,
  ActionRotate,
  Cell,
  Deg,
  MinoOffsetPoint,
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
      holdMino: 'none',
      lineCount: 0,
      level: 1,
      isGameOver: false,
    }
    this._currentMino = {
      ...CURRENT_MINO_TEMPLATE,
      mino: this.popNextMino(),
    }
  }

  /**
   * GameStateのgetter
   */
  public get gameState(): TetrisGameState {
    return this._gameState
  }

  /**
   * ループ内で実行されるアクションの種類を設定する
   * @param action 実行するアクション
   */
  public setAction(action?: Action): void {
    this._gameState.action = action
  }

  /**
   * テトリスのメインループ処理
   */
  public mainLoop(): void {
    if (this.gameState.isGameOver) {
      return
    }

    // レベル14以降の速度は一定
    const speed =
      this._gameState.level === 15
        ? 10
        : 150 - this._gameState.level * 10

    if (this._count % speed === 0) {
      // 操作中のミノが落下完了するまでの最短距離を算出
      const distance = this.calculateDistance()
      if (distance) {
        // 次回も落下可能
        this._currentMino.isFixed = false
        // 落下処理
        this.drop()
      } else {
        if (this._currentMino.isFixed) {
          // ミノを固定し、新しいミノを排出する
          this.fix()
        } else {
          // 次回の落下時に固定される
          this._currentMino.isFixed = true
        }
      }
    } else {
      this.action(this._gameState.action)
    }
    // セルの削除
    this.deleteCells()
    // セルを更新
    this.updateCells()
    // ゲームオーバーの判定
    this.checkCellsOverFlow()
    // アクションのリセット
    this.setAction(undefined)

    this._count++
  }

  /**
   * ゲームの状態をリセットする
   */
  public gameReset() {
    this._gameState = {
      cells: _.cloneDeep(createEmptyCells()),
      nextMinos: _.cloneDeep(createNextMinos()),
      holdMino: 'none',
      lineCount: 0,
      level: 1,
      isGameOver: false,
    }
    this._currentMino = {
      ...CURRENT_MINO_TEMPLATE,
      mino: this.popNextMino(),
    }
    this._count = 0
    this._fixedCells = _.cloneDeep(createEmptyCells())
  }

  /**
   * 操作中のミノの落下処理
   */
  private drop(): void {
    this._currentMino = {
      ...this._currentMino,
      pointY: this._currentMino.pointY + 1,
    }
  }

  /**
   * 落下が完了したミノを固定し、新しいミノを排出する
   */
  private fix() {
    const { pointX, pointY, mino, deg } = this._currentMino
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

  /**
   * ゲームオーバーの判定を行う
   */
  private checkCellsOverFlow() {
    for (
      let i = FIELD_WALL_THICKNESS;
      i < FIELD_WIDTH - FIELD_WALL_THICKNESS;
      i++
    ) {
      if (this._fixedCells[1][i].isFixed) {
        this.gameState.isGameOver = true
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
        this.infinity()
        this.actionHorizontal(action)
        break
      case 'rotate90CW':
      case 'rotate90CCW':
        this.infinity()
        this.actionRotate90(action)
        break
      case 'hardDrop':
        this.actionHardDrop()
        break
      case 'softDrop':
        this.actionSoftDrop()
        break
      case 'hold':
        this.actionHold()
        break
      default:
        break
    }
  }

  /**
   * 水平移動
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
   * 時計回り・反時計回り
   * {@link https://tetris.wiki/Super_Rotation_System#Wall_Kicks}
   */
  private actionRotate90(action: ActionRotate) {
    const { pointX, pointY, mino, deg } = this._currentMino
    const { points } = minos[mino]

    // Oミノの場合は回転不要
    if (mino === 'o') {
      return
    }

    // 補正値の取得
    let offsets: MinoOffsetPoint[]
    if (mino === 'i') {
      offsets = SRS_OFFSETS_I[deg][action]
    } else {
      offsets = SRS_OFFSETS[deg][action]
    }

    // 回転後の角度を算出
    const newDeg = this.calculateDeg(deg, action)
    // 回転後のミノの形状を取得
    const point = points[newDeg]

    // 5種類の補正値を順番に検証し、回転を行う
    for (let i = 0; i < offsets.length; i++) {
      const offset = offsets[i]
      if (
        this.checkRotate(
          point,
          pointX + offset.pointX,
          pointY + offset.pointY
        )
      ) {
        this._currentMino = {
          ...this._currentMino,
          deg: newDeg,
          pointX: pointX + offset.pointX,
          pointY: pointY + offset.pointY,
        }
        return
      }
    }
  }

  /**
   * 回転後の角度を算出
   * @param deg 回転前の角度
   * @param action 回転方向
   * @returns 回転後の角度
   */
  private calculateDeg(deg: Deg, action: ActionRotate) {
    // TODO: いい感じのロジックに変えたい
    switch (deg) {
      case 0:
        return action === 'rotate90CW' ? 90 : 270
      case 90:
        return action === 'rotate90CW' ? 180 : 0
      case 180:
        return action === 'rotate90CW' ? 270 : 90
      case 270:
        return action === 'rotate90CW' ? 0 : 180
    }
  }

  /**
   * 回転の可不可を確認
   * @param point ミノの形状
   * @param pointX ミノの位置(X軸)
   * @param pointY ミノの位置(Y軸)
   * @returns true:回転可能、false:回転不可能
   */
  private checkRotate(
    point: number[][],
    pointX: number,
    pointY: number
  ): boolean {
    for (let i = 0; i < point.length; i++) {
      for (let j = 0; j < point[i].length; j++) {
        if (
          point[i][j] &&
          this._fixedCells[i + pointY][j + pointX].isFixed
        ) {
          return false
        }
      }
    }
    return true
  }

  /**
   * ミノの固定直前の移動・回転はカウンターをリセットすることで
   * 無限に移動・回転をすることが可能
   */
  private infinity() {
    if (this._currentMino.isFixed) {
      this._count = 0
    }
  }

  /**
   * ハードドロップ
   */
  private actionHardDrop() {
    // 操作中のミノが落下完了するまでの最短距離を算出
    const distance = this.calculateDistance()
    this._currentMino = {
      ...this._currentMino,
      pointY: this._currentMino.pointY + distance,
    }
    this.fix()
  }

  /**
   * ソフトドロップ
   */
  private actionSoftDrop() {
    // 操作中のミノが落下完了するまでの最短距離を算出
    const distance = this.calculateDistance()
    if (distance) {
      // 落下可能の場合は、1セル下に移動
      this._currentMino = {
        ...this._currentMino,
        pointY: this._currentMino.pointY + 1,
      }
    }
  }

  /**
   * ホールド
   */
  private actionHold() {
    if (this._currentMino.canHold) {
      const holdMino = this._currentMino.mino
      // 次のミノの落下開始
      this._currentMino = {
        ...CURRENT_MINO_TEMPLATE,
        mino:
          this._gameState.holdMino === 'none'
            ? this.popNextMino()
            : this._gameState.holdMino,
        canHold: false,
      }
      this._gameState.holdMino = holdMino
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
  private calculateDistance(): number {
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

  /**
   * 削除対象となる列を算出する
   * @returns 削除対象となる列(Y軸)
   */
  private calculateDeleteCells(): number[] {
    const deleteIndex: number[] = []
    for (
      let i = FIELD_WALL_THICKNESS;
      i < FIELD_HEIGHT - FIELD_WALL_THICKNESS;
      i++
    ) {
      let minoCount = 0
      for (
        let j = FIELD_WALL_THICKNESS;
        j < FIELD_WIDTH - FIELD_WALL_THICKNESS;
        j++
      ) {
        minoCount += this._fixedCells[i][j].isFixed ? 1 : 0
      }
      if (OPERABLE_FIELD_WIDTH === minoCount) {
        deleteIndex.push(i)
      }
    }
    return deleteIndex
  }

  /**
   *  列を削除する
   */
  private deleteCells(): void {
    const newFixedCells = _.cloneDeep(this._fixedCells)
    const deleteIndex = _.cloneDeep(
      this.calculateDeleteCells()
    )
    // セルの削除・追加
    if (deleteIndex.length) {
      for (let i = 0; i < deleteIndex.length; i++) {
        // セルの削除
        newFixedCells.splice(deleteIndex[i], 1)
        // 先頭に空のセルを追加
        newFixedCells.splice(
          FIELD_WALL_THICKNESS,
          0,
          Array.from({ length: FIELD_WIDTH }, (_, i) => {
            const isWall = !(
              FIELD_WALL_THICKNESS <= i &&
              i <
                OPERABLE_FIELD_WIDTH + FIELD_WALL_THICKNESS
            )
            return {
              color: isWall ? 'gray' : '',
              isFixed: isWall,
              isCurrent: false,
              isGhost: false,
            }
          })
        )
      }
      // 固定されたセルの更新
      this._fixedCells = newFixedCells
      // 削除した列の数を更新
      this._gameState.lineCount += deleteIndex.length
      // レベルの更新
      this._gameState.level =
        Math.floor(this._gameState.lineCount / 5) + 1
    }
  }
}
