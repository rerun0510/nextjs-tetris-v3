export class Tetris {
  /** ループの回数を管理する */
  private _count: number

  /**
   * テトリスのゲームエンジン
   */
  constructor() {
    this._count = 0
  }

  /**
   * テトリスのメインループ処理
   * @param key キー情報
   * @returns TODO: セルを返す
   */
  mainLoop(key: string): number {
    if (this._count % 20 === 0) {
      console.log(`drop:${new Date()}`)
    } else {
      if (key) {
        console.log(key)
      }
    }
    this._count++
    // TODO: セルを返す
    return this._count
  }
}
